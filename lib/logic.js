/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createContract} tx instance
 * @transaction
 */
async function createContract(tx) {
      //creation of contract
        // Get the factory.
        var factory = getFactory();
        // Create a new vehicle.
        var contract = factory.newResource('org.example.mynetwork', 'Contract', '1');
        // Set the properties of the new vehicle.
        contract.medicinename = tx.medicinename;
        contract.quantity = tx.quantity;
        contract.status = tx.status;  
        contract.price = tx.price;
        //creating relationship
        var buyer = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.buyer.participantKey);
        contract.buyer = buyer;
    
        var seller = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.seller.participantKey);
        contract.seller = seller;
    
        //get the asset registry
  
        return getAssetRegistry('org.example.mynetwork.Contract')
       .then(function (ContractAssetRegistry) {
        // Get the factory for creating new asset instances.
        return ContractAssetRegistry.add(contract);
        })
       .catch(function (error) {
        // Add optional error handling here.
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
        var shipment = factory.newResource('org.example.mynetwork', 'shipment', '1');
    
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
        return ContractAssetRegistry.add(shipment);
        })
       .catch(function (error) {
        // Add optional error handling here.
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
    
   }
 /**
   * Track the trade of a commodity from one trader to another
   * @param {org.example.mynetwork.updateShipmentStatus} tx instance
   * @transaction
   */
  async function updateShipmentStatus(tx){
    
    //updating the shipment
    tx.shipment.status = tx.newShipmentStatus;
    
    //assetRegistry of updated shipment
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.shipment');
    await assetRegistry.update(tx.shipment);
    
   }

  
  
  /**
   * Track the trade of a commodity from one trader to another
   * @param {org.example.mynetwork.updateMedicine} tx instance
   * @transaction
   */
  async function updateMedicine(tx){
    
    //updating the medicine
    tx.medicine.owner = tx.owner
    
    //AssetRegistry for updated medicine
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.medicine');
    await assetRegistry.update(tx.medicine);
    
   }
  
  
  /**
   * Track the trade of a commodity from one trader to another
   * @param {org.example.mynetwork.updateContract} tx instance
   * @transaction
   */
  async function updateContract(tx){
    
    //updating the payment status of contract
    tx.contract.status = tx.new_status;
    
    //assetRegistry for updated payment status
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.Contract')
    await assetRegistry.update(tx.contract);
    
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
        var medicine = factory.newResource('org.example.mynetwork', 'medicine', '1');
        // Set the properties of the new vehicle.
        medicine.medicineName = tx.medicineName;
        medicine.manufactureDate = tx.manufactureDate;
        medicine.expiryDate = tx.expiryDate;
      
        //creation of relationship
        var manufacturer = factory.newRelationship('org.example.mynetwork', 'Manufacturer', tx.manufacturer.participantKey);
        medicine.manufacturer = manufacturer;
    
        var owner = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.owner.participantKey);
        medicine.owner = owner;
    
        //assetRegistry
        return getAssetRegistry('org.example.mynetwork.medicine')
       .then(function (ContractAssetRegistry) {
        // Get the factory for creating new asset instances.
        return ContractAssetRegistry.add(medicine);
        })
       .catch(function (error) {
        // Add optional error handling here.
       });
    
  }
  
  
  /**
   * Track the trade of a commodity from one trader to another
   * @param {org.example.mynetwork.deleteShipment} tx instance
   * @transaction
   */
  async function deleteShipment(tx){
    
       if(tx.Shipment.destinationAddress == tx.Shipment.currentAddress  && tx.Shipment.status == 'DELIVERED')
       {
         
          return getAssetRegistry('org.example.mynetwork.shipment')
          .then(function (ShipmentAssetRegistry) {
          
          // Remove the vehicle from the vehicle asset registry.
          return ShipmentAssetRegistry.remove(tx.Shipment);
          })
          .catch(function (error) {
          // Add optional error handling here.
          });
         
       }
       else
       {
        //Emitting event 
          let factory = getFactory();
          let event = factory.newEvent('org.example.mynetwork', 'dltShipment');
          event.message = "Shipment is not deleted";
          event.detail = "Some Technical Detail";
          emit(event);
         
       }
    
   }