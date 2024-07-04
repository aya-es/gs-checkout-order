import {
  reactExtension,
  BlockStack,
  Image,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.header.render-after',
  () => <Extension />,
);

function Extension() {
  return (
    <BlockStack padding="none" cornerRadius="base" background="transparent"  >
      <Image source="https://cdn.shopify.com/s/files/1/0580/9052/0735/files/checkout_happy_customers-header.png?v=1717075327" />
    </BlockStack>
  );
}