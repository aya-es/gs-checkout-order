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
  const shippingTruck = "https://cdn.shopify.com/s/files/1/0580/9052/0735/files/checkout_es-truck.png?v=1717075312"
  return (
    <BlockStack padding="base" background="subdued"  >
    <InlineLayout columns={['8%', 'fill']} spacing="base" blockAlignment="center">
      <Image source={shippingTruck} />
      <TextBlock size="small">Enter your address to check shipping rates and nearby Click & Collect locations.</TextBlock>
    </InlineLayout>
    </BlockStack>
  );
}