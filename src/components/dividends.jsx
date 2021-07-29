export const Dividends = (props) => (
  <div id="dividends">
    <div className="container">
      <p className="title text-center">Dividends</p>
      {props.data.map((item, index) => (
        <div key={index} className="col-md-8 col-md-offset-2">
          <p className="header">{item.header}</p>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}
    </div>
    <div id="footer">
      <div className="container text-center">
        <p>
          Wait, join us on{" "}
          <a href={process.env.DISCORD_URL} alt="discord">
            discord
          </a>
        </p>
      </div>
    </div>
  </div>
);
