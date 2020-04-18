import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  helloWorld: Scalars['String'];
};

export type Users = {
   __typename?: 'Users';
  id: Scalars['ID'];
  name: Scalars['String'];
  lastname: Scalars['String'];
};

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & Pick<Query, 'helloWorld'>
);

