chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
})

chrome.identity.onSignInChanged.addListener((_, signedIn) => {
  chrome.contextMenus.update('store', {
    enabled: signedIn
  })
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.identity.getAuthToken({ interactive: false }, (token) => {
    if (chrome.runtime.lastError && !token) {
      chrome.contextMenus.create({
        id: 'store',
        title: 'Save quote',
        type: 'normal',
        contexts: ['selection'],
        enabled: false
      })

    } else {
      chrome.contextMenus.create({
        id: 'store',
        title: 'Save quote',
        type: 'normal',
        contexts: ['selection']
      })
    }
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.identity.getAuthToken({ interactive: false }, async (token) => {
    if (chrome.runtime.lastError && !token) {
      return;
    }

    fetch(process.env.API_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        query: `
          mutation QuoteCreate ($data: QuoteCreateInput!) {
            quoteCreate (data: $data) {
              id
            }
          }
        `,
        variables: {
          data: {
            name: tab?.title,
            content: info.selectionText,
            link: info.pageUrl,
          }
        }
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      return res.json();
    })
    .then(() => {
      chrome.notifications.create('quote-store-success', {
        priority: 2,
        type: 'basic',
        title: 'Quote stored successfully',
        iconUrl: '../success.png',
        message: `"${tab?.title}" stored successfully`
      })

    })
    .catch(() => {
      chrome.notifications.create('quote-store-error', {
        priority: 2,
        type: 'basic',
        title: "Quote couldn't be stored",
        iconUrl: '../error.png',
        message: `Something happened while storing a quote from "${tab?.title}", please try again.`,
        // buttons: [
        //   {
        //     title: 'Retry'
        //   }
        // ]
      })
    })
  })
})