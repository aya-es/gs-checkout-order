import {
  useTranslate,
  reactExtension,
  PaymentIcon,
  View,
  InlineStack,
  Icon,
  Text,
  BlockSpacer,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.footer.render-after',
  () => <Extension />,
);

function Extension() {

  return (
    <View padding="none">
    <BlockSpacer spacing="tight" />
 <InlineStack spacing="extraTight">
   <Icon source="lock" size="small"/>

   <Text emphasis="bold" size="small">100% Secure Payments</Text>
   </InlineStack>

   <BlockSpacer spacing="extraTight" />
   <InlineStack spacing="tight">
       <PaymentIcon name="visa" />
       <PaymentIcon name="master" />
       <PaymentIcon name="american-express" />
       <PaymentIcon name="afterpay" />
       <PaymentIcon name="paypal" />
       <PaymentIcon name="google-pay" />
       <PaymentIcon name="apple-pay" />
       <PaymentIcon name="shop-pay" />
       <PaymentIcon name="zip" />
   </InlineStack>

</View>
  );
}