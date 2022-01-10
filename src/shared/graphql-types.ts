export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string in YYYY-MM-DD format */
  Date: any;
  /** A DateTime string in ISO 8601 format */
  DateTime: any;
};

export type DatePredicate = {
  equals?: Maybe<Scalars['Date']>;
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  in?: Maybe<Array<Scalars['Date']>>;
  is_empty?: Maybe<Scalars['Boolean']>;
  is_not_empty?: Maybe<Scalars['Boolean']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  not_equals?: Maybe<Scalars['Date']>;
  not_in?: Maybe<Array<Scalars['Date']>>;
};

export type DateTimePredicate = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['Date']>;
  gte?: Maybe<Scalars['Date']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  is_empty?: Maybe<Scalars['Boolean']>;
  is_not_empty?: Maybe<Scalars['Boolean']>;
  lt?: Maybe<Scalars['Date']>;
  lte?: Maybe<Scalars['Date']>;
  not_equals?: Maybe<Scalars['DateTime']>;
  not_in?: Maybe<Array<Scalars['DateTime']>>;
};

export type DeleteResult = {
  __typename?: 'DeleteResult';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type IdPredicate = {
  contains?: Maybe<Scalars['ID']>;
  ends_with?: Maybe<Scalars['ID']>;
  equals?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
  not_ends_with?: Maybe<Scalars['ID']>;
  not_equals?: Maybe<Scalars['ID']>;
  not_in?: Maybe<Array<Scalars['ID']>>;
  not_starts_with?: Maybe<Scalars['ID']>;
  starts_with?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  quoteCreate?: Maybe<Quote>;
  quoteDelete: DeleteResult;
  quoteUpdate?: Maybe<Quote>;
  reportCreate?: Maybe<Report>;
  reportUpdate?: Maybe<Report>;
  storyCreate: Story;
  storyDelete?: Maybe<DeleteResult>;
  userBan?: Maybe<User>;
  userSetRole?: Maybe<User>;
  userUnban?: Maybe<User>;
  userUpdate?: Maybe<User>;
};


export type MutationQuoteCreateArgs = {
  data: QuoteCreateInput;
};


export type MutationQuoteDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationQuoteUpdateArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationReportCreateArgs = {
  data: ReportCreateInput;
};


export type MutationReportUpdateArgs = {
  id: Scalars['ID'];
  status: Scalars['String'];
};


export type MutationStoryCreateArgs = {
  color?: Maybe<Scalars['String']>;
  quote: StoryQuoteRelationInput;
  typography?: Maybe<Typography>;
};


export type MutationStoryDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationUserBanArgs = {
  id: Scalars['ID'];
};


export type MutationUserSetRoleArgs = {
  id: Scalars['ID'];
  role: Role;
};


export type MutationUserUnbanArgs = {
  id: Scalars['ID'];
};


export type MutationUserUpdateArgs = {
  data: UserUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  myStoriesList: StoryListResponse;
  quotesList: QuoteListResponse;
  reportsList?: Maybe<ReportListResponse>;
  storiesList?: Maybe<UsersStoryListResponse>;
  user: User;
  usersList: UserListResponse;
};


export type QueryMyStoriesListArgs = {
  filter?: Maybe<StoryFilter>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryQuotesListArgs = {
  filter?: Maybe<QuoteFilter>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryReportsListArgs = {
  filter?: Maybe<ReportFilter>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryStoriesListArgs = {
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryUsersListArgs = {
  filter?: Maybe<UserFilter>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type Quote = {
  __typename?: 'Quote';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  link: Scalars['String'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type QuoteCreateInput = {
  content: Scalars['String'];
  link: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type QuoteFilter = {
  AND?: Maybe<Array<QuoteFilter>>;
  OR?: Maybe<Array<QuoteFilter>>;
  content?: Maybe<StringPredicate>;
  createdAt?: Maybe<DateTimePredicate>;
  deletedAt?: Maybe<DateTimePredicate>;
  id?: Maybe<IdPredicate>;
  link?: Maybe<StringPredicate>;
  name?: Maybe<StringPredicate>;
  updatedAt?: Maybe<DateTimePredicate>;
};

export type QuoteKeyFilter = {
  id?: Maybe<Scalars['ID']>;
};

export type QuoteListResponse = {
  __typename?: 'QuoteListResponse';
  count: Scalars['Int'];
  items: Array<Quote>;
};

export type Report = {
  __typename?: 'Report';
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  reason?: Maybe<Scalars['String']>;
  status?: Maybe<ReportStatus>;
  story?: Maybe<Story>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type ReportCreateInput = {
  reason: Scalars['String'];
  story: ReportStoryRelationInput;
};

export type ReportFilter = {
  AND?: Maybe<Array<ReportFilter>>;
  OR?: Maybe<Array<ReportFilter>>;
  createdAt?: Maybe<DateTimePredicate>;
  id?: Maybe<IdPredicate>;
  reason?: Maybe<StringPredicate>;
  status?: Maybe<StringPredicate>;
  updatedAt?: Maybe<DateTimePredicate>;
};

export type ReportListResponse = {
  __typename?: 'ReportListResponse';
  count: Scalars['Int'];
  items: Array<Report>;
};

export enum ReportStatus {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export type ReportStoryRelationInput = {
  connect?: Maybe<StoryKeyFilter>;
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export enum Status {
  Active = 'active',
  Banned = 'banned'
}

export type Story = {
  __typename?: 'Story';
  color: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  link: Scalars['String'];
  typography: Typography;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type StoryFilter = {
  AND?: Maybe<Array<StoryFilter>>;
  OR?: Maybe<Array<StoryFilter>>;
  color?: Maybe<StringPredicate>;
  content?: Maybe<StringPredicate>;
  id?: Maybe<IdPredicate>;
  link?: Maybe<StringPredicate>;
};

export type StoryKeyFilter = {
  id?: Maybe<Scalars['ID']>;
};

export type StoryListResponse = {
  __typename?: 'StoryListResponse';
  count: Scalars['Int'];
  items: Array<Story>;
};

export type StoryQuoteRelationInput = {
  connect?: Maybe<QuoteKeyFilter>;
};

export type StringPredicate = {
  contains?: Maybe<Scalars['String']>;
  ends_with?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  not_ends_with?: Maybe<Scalars['String']>;
  not_equals?: Maybe<Scalars['String']>;
  not_in?: Maybe<Array<Scalars['String']>>;
  not_starts_with?: Maybe<Scalars['String']>;
  starts_with?: Maybe<Scalars['String']>;
};

export enum Typography {
  Arial = 'Arial',
  Barlow = 'Barlow',
  Poppins = 'Poppins'
}

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  role: Role;
  status: Status;
  stories: UserStoriesCount;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserFilter = {
  AND?: Maybe<Array<UserFilter>>;
  OR?: Maybe<Array<UserFilter>>;
  birthDate?: Maybe<DatePredicate>;
  createdAt?: Maybe<DateTimePredicate>;
  deletedAt?: Maybe<DateTimePredicate>;
  email?: Maybe<StringPredicate>;
  firstName?: Maybe<StringPredicate>;
  id?: Maybe<IdPredicate>;
  lastName?: Maybe<StringPredicate>;
  updatedAt?: Maybe<DateTimePredicate>;
};

export type UserListResponse = {
  __typename?: 'UserListResponse';
  count: Scalars['Int'];
  items: Array<User>;
};

export type UserStoriesCount = {
  __typename?: 'UserStoriesCount';
  count?: Maybe<Scalars['Int']>;
};

export type UserUpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type UsersStoryListResponse = {
  __typename?: 'UsersStoryListResponse';
  count?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<Maybe<User>>>;
};

export type FetchQuotesVariables = Exact<{
  filter?: Maybe<QuoteFilter>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type FetchQuotes = { __typename?: 'Query', quotesList: { __typename: 'QuoteListResponse', count: number, items: Array<{ __typename: 'Quote', id: string, name: string, content: string, link: string, createdAt: any }> } };

export type DeleteQuoteVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteQuote = { __typename?: 'Mutation', quoteDelete: { __typename?: 'DeleteResult', success: boolean, message?: string | null | undefined } };

export type UpdateQuoteVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateQuote = { __typename?: 'Mutation', quoteUpdate?: { __typename: 'Quote', id: string, name: string, content: string, link: string, createdAt: any } | null | undefined };

export type CreateStoryVariables = Exact<{
  quote: Scalars['ID'];
  color?: Maybe<Scalars['String']>;
  typography?: Maybe<Typography>;
}>;


export type CreateStory = { __typename?: 'Mutation', storyCreate: { __typename?: 'Story', id: string } };

export type FetchMyStoriesVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type FetchMyStories = { __typename?: 'Query', myStoriesList: { __typename?: 'StoryListResponse', count: number, items: Array<{ __typename?: 'Story', id: string, color: string, typography: Typography, content: string, link: string, createdAt: any }> } };

export type FetchUserVariables = Exact<{ [key: string]: never; }>;


export type FetchUser = { __typename?: 'Query', user: { __typename: 'User', id: string, firstName: string, lastName: string, email: string, avatar: string, role: Role, status: Status, createdAt: any, updatedAt?: any | null | undefined, deletedAt?: any | null | undefined } };
