import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

//import * as data from "../../client/src/components/Home";
import DogForm from "../../client/src/components/DogForm";
import * as actions from "../../client/src/actions";

configure({ adapter: new Adapter() });

describe("<DogForm />", () => {
  const state = { dogs: data.dogs };
  const mockStore = configureStore([thunk]);
  const { CREATE_HOUSE } = actions;

  beforeAll(() => expect(isReact.classComponent(DogForm)).toBeFalsy());

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let DogForm;
    let store = mockStore(state);
    beforeEach(() => {
      DogForm = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/dog"]}>
            <DogForm />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(DogForm.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(DogForm.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "wMin"', () => {
      expect(DogForm.find('input[name="wMin"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "wMax"', () => {
      expect(DogForm.find('input[name="wMax"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "hMin"', () => {
      expect(DogForm.find('input[name="hMin"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "hMax"', () => {
      expect(DogForm.find('input[name="hMax"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "life_spanMin"', () => {
      expect(DogForm.find('input[name="life_spanMin"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "life_spanMax"', () => {
      expect(DogForm.find('input[name="life_spanMax"]')).toHaveLength(1);
    });

    it('Debería renderizar un input con la propiedad "name" igual a "image"', () => {
      expect(DogForm.find('input[name="image"]')).toHaveLength(1);
    });

    it('Debería renderizar un select con la propiedad "name" igual a "temperament"', () => {
      expect(DogForm.find('select[name="temperament"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Create"', () => {
      expect(DogForm.find('button[type="submit"]')).toHaveLength(1);
      expect(DogForm.find("button").at(0).text()).toEqual("Create");
    });
  });
});