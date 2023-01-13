import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  signin: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  alex: Scalars['String'];
  authUserLists: Scalars['String'];
  users: Array<Users>;
};

export type Users = {
  __typename?: 'Users';
  email: Scalars['String'];
  id: Scalars['String'];
};

export type AlexTestQueryVariables = Exact<{ [key: string]: never; }>;


export type AlexTestQuery = { __typename?: 'Query', alex: string };

export type SigninMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: boolean };


export const AlexTestDocument = gql`
    query alexTest {
  alex
}
    `;

/**
 * __useAlexTestQuery__
 *
 * To run a query within a React component, call `useAlexTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlexTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlexTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlexTestQuery(baseOptions?: Apollo.QueryHookOptions<AlexTestQuery, AlexTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AlexTestQuery, AlexTestQueryVariables>(AlexTestDocument, options);
      }
export function useAlexTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlexTestQuery, AlexTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AlexTestQuery, AlexTestQueryVariables>(AlexTestDocument, options);
        }
export type AlexTestQueryHookResult = ReturnType<typeof useAlexTestQuery>;
export type AlexTestLazyQueryHookResult = ReturnType<typeof useAlexTestLazyQuery>;
export type AlexTestQueryResult = Apollo.QueryResult<AlexTestQuery, AlexTestQueryVariables>;
export const SigninDocument = gql`
    mutation Signin($password: String!, $email: String!) {
  signin(password: $password, email: $email)
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;