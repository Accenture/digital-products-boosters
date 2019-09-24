import React from "react";
import classNames from "./class-names.module.css";

export const facilities = [
  { id: "1", city: "Boston, MA" },
  { id: "2", city: "Concord, MA" },
  { id: "3", city: "Albany, NY" },
  { id: "4", city: "New York, NY" },
  { id: "5", city: "DallasTX" },
  { id: "6", city: "Houston, TX" }
];

export const petsByFacilityId = {
  "1": [{ id: "1", name: "Basil" }, { id: "2", name: "Copper" }],
  "2": [{ id: "3", name: "Diesel" }, { id: "4", name: "Hank" }],
  "3": [{ id: "5", name: "Monty" }, { id: "6", name: "Parker" }],
  "4": [{ id: "7", name: "Sherlock" }, { id: "8", name: "Ender" }],
  "5": [{ id: "9", name: "Milo" }, { id: "10", name: "Goose" }],
  "6": [{ id: "11", name: "Chucky" }, { id: "12", name: "Mongo" }]
};

export const text = {
  adoptionForm: "Pet Adoption Form",
  adopt: "Adopt!",
  errors: "Must fill out all fields",
  facility: "Facility",
  fullName: "Full Name",
  pet: "Pet",
  state: "State",
  success: "Adoption form received!"
};

const BlankOption = () => <option disabled hidden />;

const PetAdoptionFormBase = ({ pets }) => (
  <div className={classNames.root}>
    <form>
      <h1>{text.adoptionForm}</h1>
      <label htmlFor="fullName">{text.fullName}</label>
      <input id="fullName" name="fullName" />
      <div>
        <label htmlFor="facility">{text.facility}</label>
        <select id="facility" name="facility">
          <BlankOption />
          {facilities.map(({ id, city }) => (
            <option key={id} value={id}>
              {city}
            </option>
          ))}
        </select>
        <label htmlFor="pet">{text.pet}</label>
        <select id="pet" name="pet">
          <BlankOption />
          {pets.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button>{text.adopt}</button>
    </form>
  </div>
);

const PetAdoptionForm = props => {
  const baseProps = { ...props, pets: [] };

  return <PetAdoptionFormBase {...baseProps} />;
};

export default PetAdoptionForm;
