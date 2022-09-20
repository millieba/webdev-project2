import './App.css';

function SendLink() {
  return (
    <div>
      <form>
        <label>
          Link: 
          <input type="text" name="link"/>
        </label>
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
}

export default SendLink;
