import "bootstrap/dist/css/bootstrap.css";
import "../BrowseRange/BrowseRange.css";

function BrowseRange() {
  return (
    <section className="mt-5 " id="browse-the-range">
      <div className="container-lg">
        <div className="text-center">
          <p className="display-5 fw-bold">Browse The Range</p>
          <p className="text-muted lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <div className="browsing">
        <div className="container-fluid d-lg-flex furniture justify-content-center">
          <div className="row">
            <div className="col">
              <img src="img/dininng.png" alt="dining room" className="img-fluid" />
              <div className="dining-room text-center">Dining</div>
            </div>
            <div className="col">
              <img src="img/living.png" alt="living" className="img-fluid" />
              <div className="living-room text-center">living</div>
            </div>
            <div className="col">
              <img src="img/bedroom.png" alt="bedroom" className="img-fluid" />
              <div className="bedroom-room text-center">Bedroom</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrowseRange;
