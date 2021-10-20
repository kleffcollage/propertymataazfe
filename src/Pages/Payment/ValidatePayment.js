import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt, FaRegCreditCard } from "react-icons/fa";
import { MdStoreMallDirectory } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import Moment from "react-moment";
import Naira from "react-naira";
import { useLocation } from "react-router-dom";
import Fetch from "../../Utilities/Fetch";
import Spinner from "../../Utilities/Spinner";

export default function ValidatePayment() {
  const location = useLocation().search;
  // const {status,tx_ref,transaction_id} = useParams();
  const status = new URLSearchParams(location).get("status");
  const tx_ref = new URLSearchParams(location).get("tx_ref");
  const transaction_id = new URLSearchParams(location).get("transaction_id");

  const [validating, setValidating] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isRelief, setIsRelief] = useState(false);
  const [property, setProperty] = useState({});
  const [transaction, setTransaction] = useState({});
  const [paymentLog,setPaymentLog] = useState({});
  const [card,setCard] = useState({});

  const validatePayment = async () => {
    setValidating(true);
    try {
      const data = await Fetch(`payment/validate/${tx_ref}/${transaction_id}`);
      console.log({ data });
      if (!data.status) {
        setValidating(false);
        setPaymentStatus(false);
        return;
      }
      setValidating(false);
      data.data.isRelief ? setIsRelief(true) : setIsRelief(false)
      setProperty(data.data.property);
      setPaymentStatus(true);
      setTransaction(data.data.transaction);
	    setPaymentLog(data.data.transaction.paymentLog)
	    setCard(data.data.transaction.paymentLog.card)
      return;
    } catch (err) {}
  };

  useEffect(() => {
    const get = async () => {
      await validatePayment();
    };
    get();
  }, []);

  return paymentStatus ? (
    <div className="content-section mt-5 w-50">
      { validating ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner color="primary" size={50}/>
        </div>
      ) : (
        <>
          <div className="pay-modal-wrap">
            <div className="name py-3 mb-4">
              <h5>Payment Receipt</h5>
            </div>
            <div className="d-flex receipt-wrap my-2">
              <div className="icon">
                <RiShoppingCartLine />
              </div>
              <div className="item ml-3 px-2">
                { isRelief ? (
                    <>
                      <p className="">{`Relief payment for ${property.name}, ${property.state}, ${property.lga}`}</p>
                      <p className="mt-2">
                        <Naira>{transaction.amount}</Naira>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="">{`Purchase of ${property.name}, ${property.state}, ${property.lga}`}</p>
                      <p className="mt-2">
                        <Naira>{property.price}</Naira>
                      </p>                    
                    </>
                  )
                }
              </div>
            </div>
            <div className="d-flex receipt-wrap my-2">
              <div className="icon">
                {" "}
                <MdStoreMallDirectory />{" "}
              </div>
              <div className="item ml-3 px-2">
                <p className="section-heading mb-0">Paid To</p>
                <p className="">PropertyMataaz Limited</p>
              </div>
            </div>
            <div className="d-flex receipt-wrap my-2">
              <div className="icon">
                {" "}
                <FaRegCalendarAlt />{" "}
              </div>
              <div className="item ml-3 px-2">
                <p className="section-heading mb-0">Date</p>
                <p className=""><Moment format='ddd MMM YYYY'>{transaction.dateCreated}</Moment></p>
              </div>
            </div>
            <div className="d-flex receipt-wrap my-2">
              <div className="icon">
                <FaRegCreditCard />
              </div>
              <div className="item ml-3 px-2">
                <p className="section-heading mb-0">Payment Method</p>
                <p className="">{ `${card.type} - ${card.last4Digits}`}</p>
              </div>
            </div>
          </div>
          <Box
            display="flex"
            width="100%"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            className="mt-4"
          >
            <button className="btn-outlined mr-2" type="submit">
              {"Download Receipt"}
            </button>
            {/* <button
          className="btn-outlined ml-2"
          type="submit"
          onClick={handlePayment}
        >
          {loading ? <Spinner /> : "Print"}
        </button> */}
          </Box>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
