import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../component/main/MainLayout';
import SalesMonth from '../view/sales/month/SalesMonthPage';
import SalesYear from '../view/sales/year/SalesYearPage';
import ExpenseMonth from '../view/expense/ExpenseMonthPage';
import ExpenseYear from '../view/expense/ExpenseYearPage';
import ManageWorker from '../view/manage/ManageWorkerPage';
import ManageSchedule from '../view/manage/ManageSchedulePage';
import ManageUser from '../view/manage/ManageUserPage';

import LoginLayout from '../component/login/LoginLayout';
import Login from '../view/user/login/LoginPage';
import FindPasswordSendOtpPage from '../view/user/findPassword/FindPasswordSendOtpPage';
import FindPwProtectedRoute from './FindPwProtectedRoute';
import FindPasswordVerifyOtpPage from '../view/user/findPassword/FindPasswordVerifyOtpPage';
import FindPasswordUpdatePwPage from '../view/user/findPassword/FindPasswordUpdatePwPage';
import LoginProtectedRoute from './LoginProtectedRoute';
import UnauthorizedPage from '../view/common/UnauthorizedPage';
import SalesMonthPage from '../view/sales/month/SalesMonthPage';

const AppRouter: React.FC = () => {
	const mainLayout = <MainLayout/>;

	const salesYearPage = <SalesYear />;
	const salesMonthPage = <SalesMonthPage />;

	const expenseYearPage = <ExpenseYear />;
	const expenseMonthPage = <ExpenseMonth />;
	
	const manageWorkerPage = <ManageWorker />;
	const manageSchedulePage = <ManageSchedule />;
	const manageUserPage = <ManageUser />;
	  
	const loginPage = <Login />;
	const findPasswordSendOtpPage = <FindPasswordSendOtpPage />
	const findPasswordVerifyOtpPage = <FindPasswordVerifyOtpPage />;
	const findPasswordUpdatePwPage = <FindPasswordUpdatePwPage />;
	const loginLayout = <LoginLayout />;

	return (
		<BrowserRouter>
			<Routes>
				<Route path='unauthorized' element={<UnauthorizedPage />} />
				<Route path='login' element={loginLayout}>
					<Route path='' element={loginPage}></Route>
				</Route>
				<Route path='findPassword' element={loginLayout}>
					<Route path='otp' element={findPasswordSendOtpPage}></Route>
					<Route path='otp/verify' element={<FindPwProtectedRoute>{findPasswordVerifyOtpPage}</FindPwProtectedRoute>}></Route>
					<Route path='new' element={<FindPwProtectedRoute>{findPasswordUpdatePwPage}</FindPwProtectedRoute>}></Route>
				</Route>
				<Route path='' element={<LoginProtectedRoute>{mainLayout}</LoginProtectedRoute>}>
					<Route path='sales'>
						<Route path='year' element={salesYearPage}></Route>
						<Route path='month' element={salesMonthPage}></Route>
						<Route path='day'></Route>
					</Route>
					<Route path='expense'>
						<Route path='year' element={expenseYearPage}></Route>
						<Route path='month' element={expenseMonthPage}></Route>
						<Route path='day'></Route>
					</Route>
					<Route path='manage'>
						<Route path='schedule' element={manageWorkerPage}></Route>
						<Route path='worker' element={manageSchedulePage}></Route>
						<Route path='user' element={manageUserPage}></Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
};

export default AppRouter;