import { CreateExpenseInput, UpdateExpenseInput } from './Expense.input';
import { CreatePoiInput, OperatingHoursInput } from './Poi.input';
import CreateTripInput from './Trip.input';
import CreateTripPreferenceInput from './TripPreference.input';
import CreateUserInput from './User.input';

const Inputs = [
  CreateUserInput,
  CreateTripInput,
  CreateExpenseInput,
  UpdateExpenseInput,
  OperatingHoursInput,
  CreatePoiInput,
  CreateTripPreferenceInput,
];

export default Inputs;
