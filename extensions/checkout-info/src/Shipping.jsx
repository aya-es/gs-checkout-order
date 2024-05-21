import {
  BlockStack,
  reactExtension,
  TextBlock,
  Image,
  InlineLayout,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.delivery-address.render-before',
  () => <Extension />,
);

function Extension() {
  const shippingTruck = "https://cdn.shopify.com/s/files/1/0684/0896/7416/files/es-truck.png?v=1706499281"
  return (
    <BlockStack padding="base" background="subdued"  >
    <InlineLayout columns={['8%', 'fill']} spacing="base" blockAlignment="center">
      <Image source={shippingTruck} />
      <TextBlock size="small">Enter your address to check shipping rates and nearby Click & Collect locations.</TextBlock>
    </InlineLayout>
    </BlockStack>
  );
}