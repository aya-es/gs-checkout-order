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
  const uspImg  = "https://cdn.shopify.com/s/files/1/0580/9052/0735/files/checkout_usp.jpg?v=1717075252"
    return (
      <BlockStack  background="base" >
         <Image source={uspImg} />
      </BlockStack>
    );
  }