import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/main/MainLayout';
import SalesMonth from '../view/sales/month/SalesMonthPage';
import SalesYear from '../view/sales/year/SalesYearPage';
import ExpenseMonth from '../view/expense/ExpenseMonthPage';
import ExpenseYear from '../view/expense/ExpenseYearPage';
import ManageWorker from '../view/manage/ManageWorkerPage';
import ManageSchedule from '../view/manage/ManageSchedulePage';
import ManageUser from '../view/manage/ManageUserPage';

import LoginLayout from '../layout/login/LoginLayout';
import Login from '../view/user/login/LoginPage';
import FindPasswordSendOtpPage from '../view/user/findPassword/FindPasswordSendOtpPage';
import FindPwProtectedRoute from './FindPwProtectedRoute';
import FindPasswordVerifyOtpPage from '../view/user/findPassword/FindPasswordVerifyOtpPage';
import FindPasswordUpdatePwPage from '../view/user/findPassword/FindPasswordUpdatePwPage';
import LoginProtectedRoute from './LoginProtectedRoute';
import UnauthorizedPage from '../view/common/UnauthorizedPage';

const AppRouter: React.FC = () => {
	const mainLayout = <MainLayout/>;

	const salesYear = <SalesYear />;
	const salesMonth = <SalesMonth />;
	
	const expenseYear = <ExpenseYear />;
	const expenseMonth = <ExpenseMonth />;
	
	const manageWorker = <ManageWorker />;
	const manageSchedule = <ManageSchedule />;
	const manageUser = <ManageUser />;
	  
	const login = <Login />;
	const findPasswordSendOtpPage = <FindPasswordSendOtpPage />
	const findPasswordVerifyOtpPage = <FindPasswordVerifyOtpPage />;
	const findPasswordUpdatePwPage = <FindPasswordUpdatePwPage />;
	const loginLayout = <LoginLayout />;

	return (
		<BrowserRouter>
			<Routes>
				<Route path='unauthorized' element={<UnauthorizedPage />} />
				<Route path='login' element={loginLayout}>
					<Route path='' element={login}></Route>
				</Route>
				<Route path='findPassword' element={loginLayout}>
					<Route path='otp' element={findPasswordSendOtpPage}></Route>
					<Route path='otp/verify' element={<FindPwProtectedRoute>{findPasswordVerifyOtpPage}</FindPwProtectedRoute>}></Route>
					<Route path='new' element={<FindPwProtectedRoute>{findPasswordUpdatePwPage}</FindPwProtectedRoute>}></Route>
				</Route>
				<Route path='' element={<LoginProtectedRoute>{mainLayout}</LoginProtectedRoute>}>
					<Route path='sales'>
						<Route path='year' element={salesYear}></Route>
						<Route path='month' element={salesMonth}></Route>
						<Route path='day'></Route>
					</Route>
					<Route path='expense'>
						<Route path='year' element={expenseYear}></Route>
						<Route path='month' element={expenseMonth}></Route>
						<Route path='day'></Route>
					</Route>
					<Route path='manage'>
						<Route path='schedule' element={manageWorker}></Route>
						<Route path='worker' element={manageSchedule}></Route>
						<Route path='user' element={manageUser}></Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
};

export default AppRouter;