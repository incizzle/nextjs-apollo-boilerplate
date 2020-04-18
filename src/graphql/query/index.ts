import { gql } from '@apollo/client'

export const HelloWorldQuery = gql`
    query {
        helloWorld
    }
`