import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manufacturers from "./Manufacturers";
import ManufacturersForm from './ManufacturersForm';
import Models from './Models';
import ModelsForm from './ModelsForm';
import Automobiles from "./Automobiles";
import AutomobilesForm from "./AutomobilesForm";
import SalesPeopleList from "./SalesPeopleList";
import AddSalesPersonForm from "./AddSalesPersonForm";
import CustomerList from "./CustomerList";
import AddCustomerForm from "./AddCustomerForm";
import SaleList from "./SaleList";
import RecordSaleForm from "./RecordSaleForm";
import SalespersonHistory from "./SalespersonHistory";
import TechniciansList from "./TechniciansList";
import AddTechnicianForm from "./AddTechnicianForm";
import CreateServiceAppointmentForm from "./CreateServiceAppointmentForm";
import ServiceHistory from "./ServiceHistory";
import ServiceAppointments from "./ServiceAppointments";



import MainPage from "./MainPage";

import Nav from "./Nav";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <div className="container">
                <Routes>

                    <Route path="/CreateServiceAppointmentForm" element={<CreateServiceAppointmentForm />} />
                    <Route path="/AddTechnicianForm" element={<AddTechnicianForm />} />
                    <Route path="/TechniciansList" element={<TechniciansList />} />
                    <Route path="/SalespersonHistory" element={<SalespersonHistory />} />
                    <Route path="/RecordSaleForm" element={<RecordSaleForm />} />
                    <Route path="/SaleList" element={<SaleList />} />
                    <Route path="/AddCustomerForm" element={<AddCustomerForm />} />
                    <Route path="/CustomerList" element={<CustomerList />} />
                    <Route path="/AddSalesPersonForm" element={<AddSalesPersonForm />} />
                    <Route path="/SalesPeopleList" element={<SalesPeopleList />} />
                    <Route path="/ServiceAppointments" element={<ServiceAppointments />} />
                    <Route path="/ServiceHistory" element={<ServiceHistory />} />
                    <Route path="/ManufacturersForm" element={<ManufacturersForm />} />
                    <Route path="/AutomobilesForm" element={<AutomobilesForm />} />
                    <Route path="/Models" element={<Models />} />
                    <Route path="/ModelsForm" element={<ModelsForm />} />
                    <Route path="/Automobiles" element={<Automobiles />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/Manufacturers" element={<Manufacturers />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
