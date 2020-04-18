import HelloWorld from '../src/components/helloWorld'
import { withApollo } from '../src/lib/apollo'

const IndexPage = props => (
    <div>
        <HelloWorld/>
    </div>
)

export default withApollo(IndexPage)