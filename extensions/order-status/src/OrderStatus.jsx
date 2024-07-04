import { useEffect, useState } from "react";
import {
  useApi,
  Link,
  reactExtension,
  Image,
  BlockStack,
  Heading,
  View,
  Icon,
  TextBlock,
  Text,
  useSubscription,   
  BlockSpacer,
  Divider,
  Spinner,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'customer-account.order-status.block.render',
  () => <Extension />,
);

function Extension() {
  const { shop, appMetafields, order } = useApi();
  const spOrderId =useSubscription(order);
  const mf =useSubscription(appMetafields);

  const [nsOrderData, setNsOrderData] = useState(null);
  const [nsTracking, setNsTracking] = useState(null);
  const [nsInstructions, setNsInstructions] = useState(null);
  // const [clickAndCollect, setClickAndCollect] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(null);


const baseUrl = 'https://3650449.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1308&deploy=1&compid=3650449&h=a5f935ac1927dddec5cb';
 
// Function to fetch order information
function fetchOrderInfo(esId, orderId, mode) { 
  
  let apiUrl = `${baseUrl}&gid=${orderId}&eid=${esId}`;
  if(mode == "test"){ apiUrl = `${baseUrl}&gid=${orderId}&mode=test`}
  // Use the fetch function to get order information from the NetSuite API
  fetch(apiUrl, {
    method: 'GET',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      'ES-Authorization': 'ESG62dgsFS342'
    }
  })
  .then(response => response.json())
  .then(data => {
  if(data){
    // console.log('Order Information:', data);
    setNsOrderData(data);
    data.tracking_url && setNsTracking(data.tracking_url);
    setDeliveryMethod(data.delivery_method);
    // console.log(data.shed_instructions.length);
    // console.log(data.shed_instructions[0].shed_model !== undefined);

    data.shed_instructions[0].shed_model !== undefined && setNsInstructions(data.shed_instructions);

  }else{ setNsOrderData("error")}
    
  })
  .catch(error => {
    setNsOrderData("error")
    //console.error('Error fetching order information:', error);
  });
}

  // useEffectを使ってコンポーネントがマウントされた時に一度だけ実行されるようにする
  useEffect(() => {
    // console.log("spOrderId")
     //console.log(spOrderId)
    // console.log(mf)
    let order_id = spOrderId.id.split('/');
    const testMode = mf.find(item => item.metafield.key === "test_mode")?.metafield.value
    const testGid = mf.find(item => item.metafield.key === "test_gid")?.metafield.value
    //console.log(order_id[4])
    if(order_id[4] == 1){
      //console.log('Checkout Setting mode');
      const liveGid = mf.find(item => item.metafield.key === "live_gid")?.metafield.value
      //console.log(liveGid);
      fetchOrderInfo('', liveGid, "test");
    } else if(testMode == "true" && order_id[4] == testGid ){
      //console.log('Test Gid mode');
      const liveGid = mf.find(item => item.metafield.key === "live_gid")?.metafield.value
      fetchOrderInfo('', liveGid, "test");
    } else{    
      fetchOrderInfo(spOrderId.name, order_id[4],"order");
      //console.log('Live Gid mode');
      //console.log(order_id)
    }
    // fetchOrderInfo(spOrderId.name, order_id[4]);
    // fetchOrderInfo("ES118371", "5616867770527");//Click&Collect
   
  }, []); 

  return (
   
    <View>
       { nsOrderData !== null &&nsOrderData !== "error" ? 
          <View>
    <BlockStack cornerRadius="loose" padding="loose" background="subdued">
 <Heading level="2">{nsOrderData.status_contents.title}</Heading>     
      <TextBlock>{nsOrderData.status_contents.body}</TextBlock> 
      <TextBlock>{nsOrderData.status_contents.footer}</TextBlock> 

      {nsTracking && <Link to={nsTracking} external>Track your Order</Link> }
      {deliveryMethod == "Click&Collect" ?
      <View>
      <Divider />
      <BlockSpacer spacing="base" />
      <TextBlock emphasis="bold">Your Click and Collect Location</TextBlock>
      <TextBlock> {nsOrderData.click_and_collect.address} <Link to={nsOrderData.click_and_collect.url} external>Map</Link></TextBlock>
      <TextBlock><Link to={`tel:${nsOrderData.click_and_collect.phone}`} external>{nsOrderData.click_and_collect.phone}</Link></TextBlock>
   
      </View> 
      : deliveryMethod == "Home Delivery" ?
      <View>
         <Divider />
         <BlockSpacer spacing="base" />
         <TextBlock emphasis="bold">Your Delivery Address</TextBlock> 
         <TextBlock>{nsOrderData.shipping_address.shipping_addressee}</TextBlock>
         <TextBlock>{nsOrderData.shipping_address.shipping_addrtext}</TextBlock>
         <TextBlock>{nsOrderData.shipping_address.shipping_phone}</TextBlock></View> 
         :""
         }
    </BlockStack>
    
    {nsInstructions !== null &&
     <View>
     <BlockSpacer spacing="loose" />
     <BlockStack cornerRadius="loose" padding="loose" background="subdued">
     <Heading level="2">Easyshed Assembly Instructions</Heading>
     <TextBlock>You can download your Assembly Instructions and Concrete Slab Dimensions to help you kick start your build before your shed arrives.</TextBlock>
     {nsOrderData.shed_instructions.map((product, index) => (
      <TextBlock key={index}>
         <TextBlock emphasis="bold">{product.shed_model}: </TextBlock><Link  to={product.link} external>Assembly Instructions</Link> / <Link key={`slab-${index}`} to={product.slab_link} external>Concrete Slab Dimensions</Link>
      </TextBlock>
      ))}
     </BlockStack>

     </View>
    }
      </View> : nsOrderData === "error" ? <View></View>: <Spinner />}
     </View>
  );
}