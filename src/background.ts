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
  
})