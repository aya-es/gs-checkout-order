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
      <Image source="https://cdn.shopify.com/s/files/1/0684/0896/7416/files/Happy-customers-header.png?v=1706507275" />
    </BlockStack>
  );
}