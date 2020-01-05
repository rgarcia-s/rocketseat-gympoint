import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import StudentRegister from '../pages/StudentRegister';
import StudentEdit from '../pages/StudentEdit';
import Enrollments from '../pages/Enrollments';
import EnrollmentRegister from '../pages/EnrollmentRegister';
import EnrollmentEdit from '../pages/EnrollmentEdit';
import Plans from '../pages/Plans';
import PlanRegister from '../pages/PlanRegister';
import PlanEdit from '../pages/PlanEdit';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={StudentRegister} isPrivate />
      <Route path="/students/:id/edit" component={StudentEdit} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/register"
        component={EnrollmentRegister}
        isPrivate
      />
      <Route
        path="/enrollments/:id/edit"
        component={EnrollmentEdit}
        isPrivate
      />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/register" component={PlanRegister} isPrivate />
      <Route path="/plans/:id/edit" component={PlanEdit} isPrivate />

      <Route path="/help-orders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
