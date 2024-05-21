import {
  reactExtension,
  BlockStack,
  Image,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const uspImg  = "https://cdn.shopify.com/s/files/1/0684/0896/7416/files/usp.jpg?v=1712637832"
    return (
      <BlockStack  background="base" >
         <Image source={uspImg} />
      </BlockStack>
    );
  }