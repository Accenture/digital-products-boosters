const getBike = function(bikeId) {
  return this.bikes.find(({ id }) => id === bikeId);
};

const decrementInventory = function(bikeId) {
  const bike = this.getBike(bikeId);
  return () => {
    if (bike) bike.qty -= 1;
  };
};

const incrementInventory = function(bikeId) {
  const bike = this.getBike(bikeId);
  return () => {
    if (bike) bike.qty += 1;
  };
};

export { decrementInventory, incrementInventory, getBike };
