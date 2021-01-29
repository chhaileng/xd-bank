import { Link } from 'react-router-dom';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Space from 'antd/lib/space';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Layout.Footer>
      <Row>
        <Col flex="none">{t('footer.copyright')}</Col>
        <Col flex="auto" style={{textAlign: 'right'}}>
          <Space size="small">
            <a href="https://github.com/chhaileng/xd-bank" target="_blank" rel="noopener noreferrer">{t('footer.source_code')}</a>
            <Link to="/faq">{t('footer.faq')}</Link>
          </Space>
        </Col>
      </Row>
    </Layout.Footer>
  )
}