import { Link } from 'react-router-dom'
import { Layout, Row, Col, Space } from 'antd';

export default function Footer() {
  return (
    <Layout.Footer>
      <Row>
        <Col flex="none">© Copyright xD Bank | 2021</Col>
        <Col flex="auto" style={{textAlign: 'right'}}>
          <Space>
            <Link to="/about">/about</Link>
            <Link to="/faq">/faq</Link>
          </Space>
        </Col>
      </Row>
    </Layout.Footer>
  )
}