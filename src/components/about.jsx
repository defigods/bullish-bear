export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          <p className="title text-center">{props.data.title}</p>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: props.data.content }}
          />
        </div>
        <div
          className="col-md-12 carousel"
          data-flickity='{"wrapAround": true}'
        >
          <img src="img/bears/1.png" alt="" />
          <img src="img/bears/2.png" alt="" />
          <img src="img/bears/3.png" alt="" />
          <img src="img/bears/4.png" alt="" />
          <img src="img/bears/5.png" alt="" />
          <img src="img/bears/6.png" alt="" />
          <img src="img/bears/7.png" alt="" />
          <img src="img/bears/8.png" alt="" />
          <img src="img/bears/9.png" alt="" />
        </div>
      </div>
    </div>
  );
};
