import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getSingleTransactionAction,
  updateTransactionAction,
} from "../../Redux/slice/transactions/transactionSlice";

const EditTransaction = () => {
  const { id } = useParams();
  //Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get data from store
  const {
    transaction: transactionFetched,
    isUpdated,
    loading,
    error,
  } = useSelector((state) => state?.transactions);

  const [transaction, setTransaction] = useState({
    name: transactionFetched?.data?.name,
    amount: transactionFetched?.data?.amount,
    transactionType: transactionFetched?.data?.transactionType,
    category: transactionFetched?.data?.category,
    notes: transactionFetched?.data?.notes,
  });
  //---Destructuring---
  const { name, amount, transactionType, date, category, notes } = transaction;
  //---onchange handler----
  const onChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTransactionAction({ ...transaction, id }));
  };
  //get single transaction
  useEffect(() => {
    dispatch(getSingleTransactionAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      if (isUpdated) {
        navigate("/dashboard");
        //reload tye page
        window.location.reload();
      }
    }, 1000);
  }, [isUpdated]);

  return (
    <section className="py-16 overflow-hidden bg-white xl:pb-56">
      <div className="container px-4 mx-auto">
        <div className="max-w-md mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold leading-tight text-center md:text-5xl font-heading tracking-px-n">
            Edit Transaction
          </h2>
          <p className="mb-6 text-lg font-medium leading-normal text-gray-600">
            You are editing {name} transaction
          </p>
          {error && (
            <p className="mb-3 font-medium text-lg text-red-600 leading-normal">
              {error}
            </p>
          )}
          <form onSubmit={onSubmit}>
            <label className="block mb-5">
              <input
                value={name}
                onChange={onChange}
                name="name"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="text"
                placeholder="Name"
              />
            </label>
            <label className="block mb-5">
              <input
                value={amount}
                onChange={onChange}
                name="amount"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-2"
                type="text"
                placeholder="Enter Amount"
              />
            </label>
            <label className="block mb-5">
              <select
                value={category}
                onChange={onChange}
                name="category"
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Transaction Type --</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
            </label>
            <label className="block mb-5">
              <select
                value={transactionType}
                onChange={onChange}
                name="transactionType"
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option>-- Select Category --</option>
                <option value="Personal">Personal</option>
                <option>Groceries</option>
                <option>Transportation</option>
              </select>
            </label>
            <div>
              <div className="mt-3 mb-3">
                <textarea
                  onChange={onChange}
                  value={notes}
                  placeholder="Add Notes"
                  rows={4}
                  name="notes"
                  id="comment"
                  className="block w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            {loading ? (
              <button
                disabled
                className="w-full py-4 mb-8 font-semibold text-white transition duration-200 ease-in-out bg-gray-600 border border-indigo-700 px-9 rounded-xl shadow-4xl"
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-4 mb-8 font-semibold text-white transition duration-200 ease-in-out bg-indigo-600 border border-indigo-700 px-9 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 hover:bg-indigo-700"
              >
                Edit Transaction
              </button>
            )}
            {/* <p className="font-medium">
              <span>Already have an account?</span>
              <a className="text-indigo-600 hover:text-indigo-700" href="#">
                Back To Account
              </a>
            </p> */}

            <p className="font-medium">
              <Link
                to={`/account/${id}`}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Back To Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditTransaction;
