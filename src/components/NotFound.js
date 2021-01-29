import Typography from 'antd/lib/typography';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Typography.Title level={4} style={{textAlign: 'center', paddingTop: 30}}>{t('app.page_not_found')}</Typography.Title>
  )
}