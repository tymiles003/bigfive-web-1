import { Component, Fragment } from 'react'
import Summary from './Summary'

const Facet = ({ data }) => (
  <Fragment>
    <h2>{data.title}</h2>
    <p>Score: {data.score}/20 - {data.scoreText}</p>
    <p><span dangerouslySetInnerHTML={{__html: data.text}} /></p>
  </Fragment>
)

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.readMore = this.readMore.bind(this)
  }

  readMore (e) {
    const name = e.currentTarget.getAttribute('name')
    const action = !this.state[name] || this.state[name] === 'none'
    this.setState({ [name]: action })
  }

  render () {
    const { data, chartWidth } = this.props
    return (
      <div className='domain-wrapper'>
        <h1>{data.title}</h1>
        <p><em>{data.shortDescription}</em></p>
        <p>Score: {data.score}/120 - {data.scoreText}</p>
        <p><strong>{data.text}</strong></p>
        <p>
          {
            this.state[data.domain]
              ? <Fragment><span dangerouslySetInnerHTML={{__html: data.description}} /><br /><br /><span name={data.domain} onClick={this.readMore} style={{ cursor: 'pointer' }}><a>read less</a></span></Fragment>
              : <Fragment><span dangerouslySetInnerHTML={{__html: data.description.substring(0, 100)}} /><span name={data.domain} onClick={this.readMore} style={{ cursor: 'pointer' }}>... <a>read more</a> ({data.description.split(' ').length} words)</span></Fragment>
          }
        </p>
        {data && data.facets && <Summary data={data.facets} vAxis={{minValue: 0, maxValue: 20}} title={data.title} chartWidth={chartWidth} />}
        {data && data.facets && data.facets.map((facet, index) => <Facet data={facet} key={index} />)}
        <style jsx>
          {`
            span {
              margin-right: 10px;
            }
            .domain-wrapper {
              box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
              margin-top: 10px;
              padding: 10px;
              text-align: left;
            }
          `}
        </style>
      </div>
    )
  }
}
