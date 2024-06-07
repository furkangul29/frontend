import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../errorPage.css";

function Error404() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <h1 className="h2">Görünüşe Göre Kaybolmuş Gibisin</h1>
                  <p>Aradığın sayfa mevcut Değil!</p>
                  <Button
                    onClick={goToHomePage}
                    variant="contained"
                    color="primary"
                  >
                    Giriş Sayfasına Git
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error404;
