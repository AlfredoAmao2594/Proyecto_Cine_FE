import { Card, Col, Row, Tag, Typography } from 'antd';
import type { Premiere } from '../types/api';
import ImageWithFallback from './ImageWithFallback';


const { Title, Paragraph } = Typography;
const dateFormatter = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

interface PremiereItemProps {
  premiere: Premiere;
  onSelect: (premiere: Premiere) => void;
}

/** Una fila: imagen a la izquierda (clic → Login) y texto a la derecha. En móvil: imagen arriba. */
export default function PremiereItem({ premiere, onSelect }: PremiereItemProps) {
  const { title, description, imageUrl, releaseDate } = premiere;

  return (
    <Card styles={{ body: { padding: 0 } }} style={{ overflow: 'hidden' }}>
      <Row>
        <Col xs={24} md={8}>
          <button
            type="button"
            onClick={() => onSelect(premiere)}
            aria-label={`Elegir ${title}`}
            style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}
          >
            <ImageWithFallback src={imageUrl} alt={title} style={{ height: '100%', minHeight: 300 }} />
          </button>
        </Col>
        <Col xs={24} md={16} style={{ padding: 24 }}>
          <Title level={3} style={{ marginTop: 0 }}>{title}</Title>
          {releaseDate && (
            <Tag color="blue" style={{ marginBottom: 12 }}>
              {/* T00:00:00 = hora local; sin eso, en Perú mostraría el día anterior */}
              Estreno: {dateFormatter.format(new Date(`${releaseDate}T00:00:00`))}
            </Tag>
          )}
          <Paragraph type="secondary">{description}</Paragraph>
        </Col>
      </Row>
    </Card>
  );
}