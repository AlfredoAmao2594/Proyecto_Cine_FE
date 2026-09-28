import { Button, Col, Form, Input, Row, Select } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { DOCUMENT_TYPES, paymentRules, type PaymentFormValues } from './paymentRules';
import { formatCardNumber, formatExpiration } from '../utils/masks';
import { getCardBrand } from '../utils/cardType';
import { formatCurrency } from '../utils/formatCurrency';



interface PaymentFormProps {
  initialValues: Partial<PaymentFormValues>;
  total: number;
  submitting: boolean;
  onSubmit: (values: PaymentFormValues) => void;
}

export default function PaymentForm({ initialValues, total, submitting, onSubmit }: PaymentFormProps) {
  const [form] = Form.useForm<PaymentFormValues>();
  const brand = getCardBrand(Form.useWatch('cardNumber', form));

  return (
    <Form<PaymentFormValues>
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      requiredMark={false}
      disabled={submitting}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Número de tarjeta"
            name="cardNumber"
            rules={paymentRules.cardNumber}
            normalize={formatCardNumber}
            extra={brand}
          >
            <Input
              prefix={<CreditCardOutlined />}
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
              autoComplete="cc-number"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="Expiración (MM/AA)" name="expiration" rules={paymentRules.expiration} normalize={formatExpiration}>
            <Input placeholder="12/30" inputMode="numeric" autoComplete="cc-exp" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="CVV" name="cvv" rules={paymentRules.cvv}>
            <Input.Password maxLength={4} inputMode="numeric" autoComplete="cc-csc" visibilityToggle={false} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Nombre del titular"
            name="cardHolderName"
            rules={paymentRules.cardHolderName}
            extra="En pruebas escribe APPROVED"
          >
            <Input autoComplete="cc-name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="Correo electrónico" name="email" rules={paymentRules.email}>
            <Input type="email" autoComplete="email" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="Nombre completo" name="fullName" rules={paymentRules.fullName}>
            <Input autoComplete="name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="Tipo de documento" name="documentType" rules={paymentRules.documentType}>
            <Select options={DOCUMENT_TYPES} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Número de documento"
            name="documentNumber"
            rules={paymentRules.documentNumber}
            dependencies={['documentType']}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button type="primary" htmlType="submit" size="large" block loading={submitting}>
            Pagar {formatCurrency(total)}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}