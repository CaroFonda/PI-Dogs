import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { App } from '../App.js' ;
import Home from "../components/Home.jsx";
import LandingPage from "../components/LandingPage.jsx";
import DogForm from "../components/DogForm.jsx";

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe("El componente Landing Page debe renderizar solo en la ruta /.", () => {
    it('Debería renderizarse solo en la ruta "/"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(LandingPage)).toHaveLength(1);
    });
  });

  it('El componente Home debe renderizar en la ruta /home (Sólo en la ruta "/home")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Home)).toHaveLength(1);
  });

  it("El componente DogForm debe renderizar en la ruta /DogForm.", () => {
    const container = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/dog"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(DogForm)).toHaveLength(1);
  });
});