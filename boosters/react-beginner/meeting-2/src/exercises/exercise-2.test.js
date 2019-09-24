import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import PetAdoptionForm, {
  facilities,
  petsByFacilityId,
  text
} from "../components/pet-adoption-form";

const fillOutFullName = ({ getByLabelText }, value) => {
  const fullNameField = getByLabelText(text.fullName);
  fireEvent.change(fullNameField, { target: { value } });
  return fullNameField;
};

const selectFacility = ({ getByLabelText }, value) => {
  const facilityField = getByLabelText(text.facility);
  fireEvent.change(facilityField, { target: { value } });
  return facilityField;
};

const selectPet = ({ getByLabelText }, value) => {
  const petField = getByLabelText(text.pet);
  fireEvent.change(petField, { target: { value } });
  return petField;
};

const fillOutForm = ({ getByLabelText }) => {
  const fullNameField = fillOutFullName({ getByLabelText }, "D-Rod");
  const facilityId = facilities[0].id;
  const facilityField = selectFacility({ getByLabelText }, facilityId);
  const petId = petsByFacilityId[facilityId][0].id;
  const petField = selectPet({ getByLabelText }, petId);
  return { facilityField, fullNameField, petField };
};

const submitForm = ({ getByText }) => {
  const submitButton = getByText(text.adopt);
  fireEvent.submit(submitButton);
};

// Example https://digital-products-boosters-react-beginner-meeting-2.s3.amazonaws.com/exercise-2.gif
xdescribe("Exercise 2 - PetAdoptionForm component", () => {
  const renderComponent = () => render(<PetAdoptionForm />);

  afterEach(cleanup);

  it("should have a working full name field", () => {
    const {
      queryByDisplayValue,
      getByDisplayValue,
      getByLabelText
    } = renderComponent();

    expect(queryByDisplayValue("D-Rod")).toBeNull();
    fillOutFullName({ getByLabelText }, "D-Rod");
    getByDisplayValue("D-Rod");
  });

  it("should have a working facility field", async () => {
    const {
      queryByDisplayValue,
      getByDisplayValue,
      getByLabelText
    } = renderComponent();
    const [firstFacility, secondFacility] = facilities;

    expect(queryByDisplayValue(firstFacility.city)).toBeNull();
    selectFacility({ getByLabelText }, firstFacility.id);
    getByDisplayValue(firstFacility.city);

    expect(queryByDisplayValue(secondFacility.city)).toBeNull();
    selectFacility({ getByLabelText }, secondFacility.id);
    getByDisplayValue(secondFacility.city);
  });

  it("should have a working pet field", async () => {
    const {
      queryByDisplayValue,
      getByDisplayValue,
      getByLabelText
    } = renderComponent();
    const [{ id: facilityId }] = facilities;
    const [firstPet, secondPet] = petsByFacilityId[facilityId];

    selectFacility({ getByLabelText }, facilityId);

    expect(queryByDisplayValue(firstPet.name)).toBeNull();
    selectPet({ getByLabelText }, firstPet.id);
    getByDisplayValue(firstPet.name);

    expect(queryByDisplayValue(secondPet.name)).toBeNull();
    selectPet({ getByLabelText }, secondPet.id);
    getByDisplayValue(secondPet.name);
  });

  it("should reset the pet field if facilities is changed", async () => {
    const { getByLabelText } = renderComponent();
    const [firstFacility, secondFacility] = facilities;
    const [firstPet] = petsByFacilityId[firstFacility.id];

    selectFacility({ getByLabelText }, firstFacility.id);
    const petField = selectPet({ getByLabelText }, firstPet.id);
    expect(petField.value).toBe(firstPet.id);

    selectFacility({ getByLabelText }, secondFacility.id);
    expect(petField.value).toBe("");
  });

  it("should call window.alert and clear the form after successfully submitting", () => {
    const originalAlert = window.alert;
    window.alert = jest.fn();
    const { getByText, getByLabelText } = renderComponent();

    const { facilityField, fullNameField, petField } = fillOutForm({
      getByLabelText
    });
    submitForm({ getByText });

    expect(window.alert).toHaveBeenCalledWith(text.success);
    expect(facilityField.value).toBe("");
    expect(fullNameField.value).toBe("");
    expect(petField.value).toBe("");

    window.alert = originalAlert;
  });

  it("should disable the submit button until the form is filled out", () => {
    const { getByLabelText, getByText } = renderComponent();
    const submitButton = getByText(text.adopt);
    expect(submitButton.disabled).toBe(true);

    fillOutFullName({ getByLabelText }, "D-Rod");
    expect(submitButton.disabled).toBe(true);

    const facilityId = facilities[0].id;
    selectFacility({ getByLabelText }, facilityId);
    expect(submitButton.disabled).toBe(true);

    const petId = petsByFacilityId[facilityId][0].id;
    selectPet({ getByLabelText }, petId);

    expect(submitButton.disabled).toBe(false);
  });
});
