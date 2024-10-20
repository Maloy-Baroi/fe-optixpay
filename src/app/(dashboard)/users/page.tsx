const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return res.json();
};

const User = async () => {
  const post = await getData();

  return (
    <div>
      {post?.map((item: any) => (
        <p key={item?.title}>{item?.title}</p>
      ))}
    </div>
  );
};

export default User;
