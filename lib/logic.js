/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createContract} tx instance
 * @transaction
 */
async function createContract(tx){
 //creation of contract
   // Get the factory.
   var factory = getFactory();
   // Create a new vehicle.
   var contract = factory.newResource('org.example.mynetwork', 'Contract', tx.contractID);
 
   contract.medicinesID = tx.medicinesID; 
 	
   //contract.medicineID = tx.medicineID;
   contract.quantity = tx.quantity;
   contract.status = tx.status; 
   contract.price = tx.price;
 //creating relationship
   var buyer = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.buyer.participantID);
   contract.buyer = buyer;
   var seller = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.seller.participantID);
   contract.seller = seller;
 //get the asset registry
   return getAssetRegistry('org.example.mynetwork.Contract')
   .then(function (ContractAssetRegistry) {
 // Get the factory for creating new asset instances.
   ContractAssetRegistry.add(contract);
 
 //emitting event
   let event = factory.newEvent('org.example.mynetwork','createContractEvent');
   event.status = tx.status;
   event.medicinename = tx.medicinename;
   event.quantity = tx.quantity;
   emit(event);
   return;
   })
   .catch(function (error) {
   let event = factory.newEvent('org.example.mynetwork', 'error');
   event.message = "create contract is not done";
   event.detail = "Some Technical Detail";
   emit(event);
    });
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createShipment} tx instance
 * @transaction
 */
async function createShipment(tx) {
 //creation of shipment
   // Get the factory.
   var factory = getFactory();
   // Create a new shipment
   var shipment = factory.newResource('org.example.mynetwork', 'shipment', tx.shipmentID);
   shipment.trackingCode = tx.trackingCode;
   shipment.routeName = tx.routeName;
   shipment.originAddress = tx.originAddress;
   shipment.destinationAddress = tx.destinationAddress;
   shipment.currentAddress = tx. currentAddress;
   shipment.status = tx.status;

   //creating relationship
   var contract = factory.newRelationship('org.example.mynetwork', 'Contract', tx.contract.contractID);
   shipment.contract = contract;  
   return getAssetRegistry('org.example.mynetwork.shipment')         
   .then(function (ContractAssetRegistry) {

   // Get the factory for creating new asset instances.
   ContractAssetRegistry.add(shipment);
  
   //emitting event
   let event = factory.newEvent('org.example.mynetwork','createShipmentEvent');
   event.trackingCode = tx.trackingCode;
   event.status = tx.status;
   emit(event);
   return;
   })

   .catch(function (error) {
   let event = factory.newEvent('org.example.mynetwork', 'error');
   event.message = "create shipment is not done";
   event.detail = "Some Technical Detail";
   emit(event); 
   });
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateShipment} tx instance
 * @transaction
 */
async function updateShipment(tx){
 //updating the shipment
 tx.shipment.trackingCode = tx.newTrackingCode;
 tx.shipment.currentAddress = tx.newCurrentAddress;
 //assetRegistry of updated shipment
 let assetRegistry = await getAssetRegistry('org.example.mynetwork.shipment');
 await assetRegistry.update(tx.shipment);

 //emitting event
 let factory = getFactory();
 let event = factory.newEvent('org.example.mynetwork', 'updateShipmentEvent');
 event.newTrackingCode = tx.newTrackingCode;
 event.newCurrentAddress = tx.newCurrentAddress;
 emit(event); 
 }
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateShipmentStatus} tx instance
 * @transaction
 */
async function updateShipmentStatus(tx){
 //updating the shipment Status
  tx.shipment.status = tx.newShipmentStatus;
 //assetRegistry of updated shipment
 let assetRegistry = await getAssetRegistry('org.example.mynetwork.shipment');
 await assetRegistry.update(tx.shipment);

 //emitting event
 let factory = getFactory();
 let event = factory.newEvent('org.example.mynetwork', 'updateShipmentStatusEvent');
 event.newStatus = tx.newShipmentStatus;
 emit(event); 
 }
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateMedicine} tx instance
 * @transaction
 */
async function updateMedicine(tx){
 //updating the medicine
 tx.medicine.owner = tx.newOwner;
 //AssetRegistry for updated medicine
 let assetRegistry = await getAssetRegistry('org.example.mynetwork.medicine');
 await assetRegistry.update(tx.medicine);

 //emitting event
 let factory = getFactory();
 let event = factory.newEvent('org.example.mynetwork', 'updateMedicineEvent');
 event.medicine = tx.medicine;
 event.newOwner = tx.newOwner;
 emit(event); 
 }

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateContract} tx instance
 * @transaction
 */
async function updateContract(tx){
 //updating the payment status of contract
 tx.contract.status = tx.newPaymentStatus;
 //assetRegistry for updated payment status
 let assetRegistry = await getAssetRegistry('org.example.mynetwork.Contract')
 await assetRegistry.update(tx.contract);
 let factory = getFactory();
 let event = factory.newEvent('org.example.mynetwork', 'updateContractEvent');
 event.newPaymentStatus = tx.newPaymentStatus;
 emit(event); 
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createMedicine} tx instance
 * @transaction
 */
async function createMedicine(tx){
  //creation of Medicine
   // Get the factory.
   var factory = getFactory();
   // Create a new vehicle.
   var medicine = factory.newResource('org.example.mynetwork', 'medicine', tx.medicineID);
   // Set the properties of the new vehicle.
   medicine.medicineName = tx.medicineName;
   medicine.manufactureDate = tx.manufactureDate;
   medicine.expiryDate = tx.expiryDate;

   //creation of relationship
   var manufacturer = factory.newRelationship('org.example.mynetwork', 'Manufacturer', tx.manufacturer.participantID);
   medicine.manufacturer = manufacturer;
   var owner = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.owner.participantID);
   medicine.owner = owner;

   //assetRegistry
   return getAssetRegistry('org.example.mynetwork.medicine')
   .then(function (ContractAssetRegistry) {
   // Get the factory for creating new asset instances.
   ContractAssetRegistry.add(medicine);

   //emitting event
   let event = factory.newEvent('org.example.mynetwork', 'createMedicineEvent');
   event.medicineID = '1';
   event.medicineName = tx.medicineName;
   emit(event); 
   return;
   })
   .catch(function (error) {   
   let event = factory.newEvent('org.example.mynetwork', 'error');
   event.message = "create medicine is not done";
   event.detail = "Some Technical Detail";
   emit(event); 
   });
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.deleteShipment} tx instance
 * @transaction
 */
async function deleteShipment(tx){
   if(tx.Shipment.destinationAddress == tx.Shipment.currentAddress && tx.Shipment.status == 'DELIVERED')
   {
    return getAssetRegistry('org.example.mynetwork.shipment')
    .then(function (ShipmentAssetRegistry) {
    // Remove the vehicle from the vehicle asset registry.
    ShipmentAssetRegistry.remove(tx.Shipment);
    let factory = getFactory(); 
    let event = factory.newEvent('org.example.mynetwork', 'deleteShipmentEvent');
    event.shipmentID = tx.Shipment.shipmentID;
    event.status = tx.Shipment.status;
    emit(event); 
    return;
    })
    .catch(function (error) {
    let factory = getFactory();
    let event = factory.newEvent('org.example.mynetwork', 'error');
    event.message = "delete shipment is not done";
    event.detail = "error in catch";
    emit(event); 
    });
   }
   else
   {
   //Emitting event 
    let factory = getFactory();
    let event = factory.newEvent('org.example.mynetwork', 'error');
    event.message = "Shipment is not deleted";
    event.detail = "Destination and Status problem";
    emit(event);
   }
}
