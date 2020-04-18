import { useQuery } from '@apollo/react-hooks'
import { HelloWorldQuery } from '../graphql/query'
import { Query } from '../generated/graphql'

export default function HelloWorld() {
  let { data }: { data: Query | undefined } = useQuery(HelloWorldQuery)

  return (
    <h1>
      {data?.helloWorld}
    </h1>
  )
}