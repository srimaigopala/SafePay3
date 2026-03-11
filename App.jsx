import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Transfer } from './pages/Transfer';
import { History } from './pages/History';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('Alex');
  const [balance, setBalance] = React.useState(12450.80);
  const [transactions, setTransactions] = React.useState([
    { id: 1, name: 'Netflix Subscription', date: 'Mar 01, 2026', amount: -15.99, category: 'Entertainment', status: 'Completed', method: 'Visa Card' },
    { id: 2, name: 'Salary Deposit', date: 'Feb 28, 2026', amount: 4500.00, category: 'Income', status: 'Completed', method: 'Direct Deposit' },
    { id: 3, name: 'Amazon.com', date: 'Feb 27, 2026', amount: -84.20, category: 'Shopping', status: 'Completed', method: 'SafePay Wallet' },
    { id: 4, name: 'Starbucks Coffee', date: 'Feb 26, 2026', amount: -6.50, category: 'Food & Drink', status: 'Completed', method: 'Visa Card' },
    { id: 5, name: 'Apple Store', date: 'Feb 25, 2026', amount: -129.00, category: 'Electronics', status: 'Pending', method: 'SafePay Wallet' },
    { id: 6, name: 'Uber Trip', date: 'Feb 24, 2026', amount: -24.50, category: 'Transport', status: 'Completed', method: 'Visa Card' },
    { id: 7, name: 'Electricity Bill', date: 'Feb 23, 2026', amount: -145.00, category: 'Utilities', status: 'Completed', method: 'Bank Transfer' },
    { id: 8, name: 'Gym Membership', date: 'Feb 22, 2026', amount: -45.00, category: 'Health', status: 'Completed', method: 'Visa Card' },
  ]);

  const handleNavigate = (page) => {
    // Basic routing logic
    if (page === 'login' && isLoggedIn) {
      setIsLoggedIn(false);
      setCurrentPage('home');
      return;
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user || 'Alex');
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  const handleTransfer = (amount, recipient) => {
    const newTransaction = {
      id: Date.now(),
      name: `Transfer to ${recipient}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      amount: -amount,
      category: 'Transfer',
      status: 'Completed',
      method: 'Bank Transfer'
    };

    setBalance(prev => prev - amount);
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <Dashboard 
            onNavigate={handleNavigate} 
            balance={balance} 
            transactions={transactions.slice(0, 5)} 
            username={username}
          />
        );
      case 'transfer':
        return <Transfer onTransfer={handleTransfer} />;
      case 'history':
        return <History transactions={transactions} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        username={username}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
