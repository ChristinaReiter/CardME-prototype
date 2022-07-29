import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Popover,
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import AcquaintanceService from "../services/AcquaintanceService";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";
import AddressService from "../services/AddressService";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CheckoutService from "../services/CheckoutService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactItem = ({ contact, changeContact, allContacts }) => {
  //state for checkout-use
  const [checkoutAnchor, setCheckoutAnchor] = useState(null);

  //state for contact display
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  //state for creating new contact
  const [newStreet, setNewStreet] = useState("");
  const [newStreetNumber, setNewStreetNumber] = useState("");
  const [newZipCode, setNewZipCode] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const checkoutPopoverOpen = Boolean(checkoutAnchor);

  //delete a contact
  const deleteContact = (id) => {
    AcquaintanceService.deleteAcquaintance({ id })
      .then(() => {
        toast("Contact deleted");
        const updated = allContacts.filter((con) => con._id !== id);
        changeContact(updated);
      })
      .catch(() => {
        toast("Error deleting contact");
      });
  };

  const useForCheckout = (event) => {
    let recipient = {
      recipientStreet: street,
      recipientNumber: streetNumber,
      recipientZipcode: zipCode,
      recipientCity: city,
      recipientCountry: country,
    };

    if (name.includes(" ") && name.split(" ").length === 2) {
      recipient.recipientFirstName = name.split(" ")[0];
      recipient.recipientLastName = name.split(" ")[1];
    } else {
      recipient.recipientFirstName = name;
    }

    CheckoutService.setData(recipient);
    setCheckoutAnchor(event.currentTarget);

    setTimeout(() => {
      setCheckoutAnchor(null);
    }, 2000);
  };

  //update a contact
  const updateContact = (e, id) => {
    e.preventDefault();
    const data = {
      name: name,
      street: newStreet,
      streetNumber: newStreetNumber,
      zipCode: newZipCode,
      city: newCity,
      country: newCountry,
    };

    AcquaintanceService.updateAcquaintance({ data, id })
      .then((res) => {
        toast("Contact updated");

        changeContact((prevState) => {
          const updated = prevState.map((con) => {
            if (con._id === id) {
              return res;
            } else {
              return con;
            }
          });
          return updated;
        });
        setStreet(newStreet);
        setStreetNumber(newStreetNumber);
        setZipCode(newZipCode);
        setCity(newCity);
        setCountry(newCountry);
        handleClose();
      })
      .catch(() => {
        toast("Error updating contact");
      });
  };

  useEffect(() => {
    //see the previous adress when updating contact
    AddressService.getAddress(contact.acquaintanceAddress).then((res) => {
      setName(contact.name);
      setStreet(res.street);
      setStreetNumber(res.streetNumber);
      setZipCode(res.zipCode);
      setCity(res.city);
      setCountry(res.country);

      setNewStreet(res.street);
      setNewStreetNumber(res.streetNumber);
      setNewZipCode(res.zipCode);
      setNewCity(res.city);
      setNewCountry(res.country);
    });
  }, []);

  return (
    <div>
      <Card sx={{ backgroundColor: "#a7cda7" }}>
        <CardHeader
          action={
            <IconButton onClick={() => deleteContact(contact._id)}>
              <DeleteForeverIcon />
            </IconButton>
          }
          title={contact.name}
        />
        <CardContent>
          <Typography variant="h6">Adress:</Typography>
          <Typography variant="body1">
            {street} {streetNumber}
          </Typography>
          <Typography variant="body1">
            {zipCode} {city}
          </Typography>
          <Typography variant="body1">{country}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={useForCheckout}
            startIcon={<HowToRegIcon />}
            sx={{ marginLeft: "auto", color: "black", pr: "2em" }}
          >
            Use for checkout
          </Button>
          <Button
            onClick={handleClick}
            startIcon={<UpdateIcon />}
            sx={{ marginLeft: "auto", color: "black", pr: "2em" }}
          >
            Update
          </Button>
        </CardActions>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <form onSubmit={(e) => updateContact(e, contact._id)}>
            <TextField
              sx={{ m: 1 }}
              type="text"
              label="Contact Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></TextField>
            <TextField
              sx={{ m: 1 }}
              type="text"
              label="Street"
              name="newStreet"
              value={newStreet}
              onChange={(e) => setNewStreet(e.target.value)}
              required
            ></TextField>
            <TextField
              sx={{ m: 1 }}
              type="text"
              label="Street-Number"
              name="newStreetNumber"
              value={newStreetNumber}
              onChange={(e) => setNewStreetNumber(e.target.value)}
              required
            ></TextField>
            <TextField
              sx={{ m: 1 }}
              type="text"
              label="Zipcode"
              name="newZipCode"
              value={newZipCode}
              onChange={(e) => setNewZipCode(e.target.value)}
              required
            ></TextField>
            <TextField
              sx={{ m: 1 }}
              type="text"
              label="City"
              name="newCity"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              required
            ></TextField>
            <TextField
              sx={{ m: 1 }}
              type="text"
              label="Country"
              name="newCountry"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              required
            ></TextField>

            <Button
              sx={{ m: 2 }}
              color="secondary"
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </form>
        </Popover>
        <Popover
          open={checkoutPopoverOpen}
          anchorEl={checkoutAnchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography padding="1em">
            Contact will be used in checkout
          </Typography>
        </Popover>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ContactItem;
