export const About = (props) => {
  const indexes = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

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
          {indexes.map((index) => (
            <img
              key={"" + index}
              src={`img/bears/carousel/${index}.png`}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};
