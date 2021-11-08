import React from "react";
import { variables } from "./Variables.js";
import {Navigate} from "react-router-dom";

const Home =(props)=>
{
    var userEmail=props.email;

        return(
        <MoviesList  userEmail={userEmail}/>
        )
}
class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.movie };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return  <div className="col">
        <div className="card shadow-sm">
        
 
 <img src={variables.PHOTO_URL+ this.state.data.photoPath} alt={variables.PHOTO_URL+"Photos/defalt.jpg"} height="400" width="100%" />
          
        

          <div className="card-body">
          <div className="card-text">
            <p><b>{this.state.data.name}</b></p>
<p>Genres: {this.state.data.genres}</p>
<p>Company: {this.state.data.company}</p>
<p>Description: 
<textarea className="scroll" rows="15" cols="50" value={this.state.data.description} id="aboutDescription" readOnly
    ></textarea>
</p>
<p>Duration: {this.state.data.duration}</p> 
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.onClick}>delete</button>
              </div>
              <small className="text-muted">Release {this.state.data.releaseDate}</small>
            </div>
          </div>
        </div>
      </div>
        ;
    }
}



  
class MovieForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {setredirect:false, name: "", genres: 0, company: 0, description: "", releaseDate: "", duration: "", photoName: "", photoFile: null, photoId:0, newGenre:"",newCompany:"", genresTemp:1, companyTemp:1 };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onNewGenreChange = this.onNewGenreChange.bind(this);
        this.onNewComapnyChange = this.onNewComapnyChange.bind(this);
        this.onGenresChange = this.onGenresChange.bind(this);
        this.onCompanyChange = this.onCompanyChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onReleaseDateChange = this.onReleaseDateChange.bind(this);
        this.onDurationChange = this.onDurationChange.bind(this);
        this.onSubmitAddGenre = this.onSubmitAddGenre.bind(this);
        this.onSubmitAddCompany = this.onSubmitAddCompany.bind(this);
        this.onPhotoChange = this.onPhotoChange.bind(this);
     
      //  this.imageUpload = this.imageUpload.bind(this);

    }
  /*  componentDidMount() {
        var f = this.props.GenresList.map((genre) => genre.genreId);
    
        var f1 = f[0];
        this.setState({ genres:  f1});
    }*/
     redirectIfunloggined(){
        if(this.props.userEmail==='')
        {
            this.setState({ setredirect: true});
            this.render()
            
            
        }

    }

    onNameChange(e) {
        this.redirectIfunloggined();
        if (this.state.genres !== this.state.genresTemp) {
            var g = this.props.GenresList.map((genre) => genre.genreId);

            var g1 = g[0];
            this.setState({ genres: g1 });
        }
        if (this.state.company !== this.state.companyTemp) {
            var c = this.props.CompaniesList.map((company) => company.companyId);
            var c1 = c[0];
            this.setState({ company: c1 });
        }
        this.setState({ name: e.target.value });
       

    }
    onGenresChange(e) {
        this.redirectIfunloggined();
        this.setState({ genres: e.target.value });
        this.setState({ genresTemp: e.target.value });

    }
    onCompanyChange(e) {
        this.redirectIfunloggined();
        this.setState({ company: e.target.value });
        this.setState({ companyTemp: e.target.value });
    }
    onDescriptionChange(e) {
        this.redirectIfunloggined();
        this.setState({ description: e.target.value });
    }
    onReleaseDateChange(e) {
        this.redirectIfunloggined();
        if(e.target.value.length<=10)
        {
            
        if((e.target.value.length===2||e.target.value.length===5)&&e.target.value.length>this.state.releaseDate.length)
        {                    
        this.setState({ releaseDate: e.target.value+'.' });
        }
        else{
            this.setState({ releaseDate: e.target.value});
        }
        }
    }
    onDurationChange(e) {
        this.redirectIfunloggined();
        if(e.target.value.length<=8)
        {
            
        if((e.target.value.length===2||e.target.value.length===5)&&e.target.value.length>this.state.duration.length)
        {              
        this.setState({ duration: e.target.value+':' });
        }
        else{
            this.setState({ duration: e.target.value});
        }
        }
    }
    onNewGenreChange(e) {
        this.redirectIfunloggined();
        this.setState({ newGenre: e.target.value });
    }
    onSubmitAddGenre() {
        this.redirectIfunloggined();
        var newGenreOut = this.state.newGenre.trim();
        this.props.onGenreSubmit(newGenreOut);
        this.setState({ newGenre: "" });
    }
    onNewComapnyChange(e) {
        this.redirectIfunloggined();
        this.setState({ newCompany: e.target.value });
    }
    onSubmitAddCompany() {
        this.redirectIfunloggined();
        var newComapnyOut = this.state.newCompany.trim();
        this.props.onCompanySubmit(newComapnyOut);
        this.setState({ newCompany: "" });
    }
    onPhotoChange=(e)=> {
        this.redirectIfunloggined();
        this.setState({ photoFile: e.target.files[0] });
        this.setState({ photoName: e.target.files[0].name });
        
    }
   imageUpload = (movie) => {
    this.redirectIfunloggined();
        const formData = new FormData();
        formData.append("file", this.state.photoFile, this.state.photoName);

        fetch(variables.API_URL + '/savefile', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ photoId: data });
                movie.photoId = this.state.photoId;
                this.props.onMovieSubmit(movie);
            })
      
    }
 
    onSubmit(e) {
        e.preventDefault();
        this.redirectIfunloggined();
        var movieName = this.state.name.trim();
        var movieGenres = this.state.genres;
        var movieCompany = this.state.company;
        var movieDescription = this.state.description.trim();
        var movieReleaseDate = this.state.releaseDate.trim();
        var movieDuration = this.state.duration.trim();
        var moviePhotoPath = this.state.photoName.trim();
        if (!movieName || !movieDescription || !movieDuration || !movieReleaseDate ||!moviePhotoPath ) {
            return;
        }
        var ph = this.state.photoName.trim();
        this.imageUpload({ name: movieName, genres: movieGenres, company: movieCompany, photoName: ph,photoId:0, description: movieDescription, releaseDate: movieReleaseDate, duration: movieDuration });       
        this.setState({ name: "", description: "",photoName:'', photoFile:null, photoId:0, releaseDate: "",duration: "" });
    }
    render() {
        if(this.state.setredirect)
        return( <Navigate to="/login"></Navigate>);


        return (
            
           
<div>
                 <div className="row gy-3">
                <div className="col-md-3">
                    <input type="text"
                        placeholder="New Genre"
                        value={this.state.newGenre}
                        onChange={this.onNewGenreChange} />
                            
                <button onClick={this.onSubmitAddGenre}>
                    Add new genre
                </button>
                <hr/>  
                </div >
                <div className="col-md-3">
                    <input type="text"
                        placeholder="New Company"
                        value={this.state.newCompany}
                        onChange={this.onNewComapnyChange} />
                   
                <button onClick={this.onSubmitAddCompany}>
                    Add new company
                </button>
                <hr/>  
                </div>
                </div>
                
            <form onSubmit={this.onSubmit}>
            <div className="row gy-3">
            <div className="col-md-3">
                <p>
                    <input type="text"
                        placeholder="Movie name"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <div className="App">
                    <input type="file" onChange={this.onPhotoChange} />
                </div>
                </div>
                <div className="col-md-3">
                <p className="select" >
                    <select id="standard-select" onChange={this.onGenresChange}  >
                        {this.props.GenresList.map((genre) =>
                            <option value={genre.genreId} key={genre.genreId} onSelect={this.onGenresChange}>
                                {genre.genreName}
                            </option>
                        )}
                        
                    </select>
                    <span className="focus"></span>
                </p>
              
                <p className="select" >
                    <select id="standard-select" onChange={this.onCompanyChange}  >
                        {this.props.CompaniesList.map((company) =>
                            <option value={company.companyId} key={company.companyId } onSelect={this.onCompanyChange}>
                                {company.companyName}
                            </option>
                        )}

                    </select>
                    <span className="focus"></span>
                </p>
                </div>
                <div className="col-md-3">
                <p>
                    <input type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange} />
                </p>
                <p>
                    <input type="text"
                        placeholder="01.01.2000"
                        value={this.state.releaseDate}
                        onChange={this.onReleaseDateChange} />
                </p>
                </div>
              
                <div className="col-md-3">
                <p>
                    <input type="text" 
                        placeholder="00:00:00"
                        value={this.state.duration}
                        onChange={this.onDurationChange} />
                </p>             
                <input type="submit" value="Add Movie" />
                </div>
                </div>
            </form>
           </div>
        );
    }
}

/*class DataFromServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { genres: [], companies:[],  movies: [] };

        this.sortByDuration = this.sortByDuration.bind(this);
        this.sortByRelease = this.sortByRelease.bind(this);
        this.onAddMovie = this.onAddMovie.bind(this);
        this.onRemoveMovie = this.onRemoveMovie.bind(this);
    }
}*/

class MoviesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { genres: [], companies:[], movies: [] };

        this.sortByDuration = this.sortByDuration.bind(this);
        this.sortByRelease = this.sortByRelease.bind(this);
        this.onAddMovie = this.onAddMovie.bind(this);
        this.onAddGenre = this.onAddGenre.bind(this);
        this.onAddCompany = this.onAddCompany.bind(this);
        this.onGenreFilter = this.onGenreFilter.bind(this);
        this.onCompanyFilter = this.onCompanyFilter.bind(this);
        this.onRemoveMovie = this.onRemoveMovie.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
       
    }
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
    }
    // load data
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", variables.API_URL, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({genres:data.genres,companies:data.companies, movies: data.movies });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    sortByDuration() {
        if (this.state.movies.length>1) {

            var tempDuration = this.state.movies[0].duration;
            var sortlist = this.state.movies.sort((a, b) => a.duration.localeCompare(b.duration));
            if (sortlist[0].duration === tempDuration) {
                sortlist = this.state.movies.sort((a, b) => b.duration.localeCompare(a.duration));
            }            
            this.setState({ movies: sortlist });
        }
      //  this.setState(prevState => {
      //      this.state.movies.sort((a, b) => a.name.localeCompare(b.name))
    //    });
    }

    sortByRelease() {
        if (this.state.movies.length > 1) {
            var tempRelease = this.state.movies[0].releaseDate;
            var sortlist = this.state.movies.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
            if (sortlist[0].releaseDate === tempRelease) {
                var sortlist = this.state.movies.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
            }
            this.setState({ movies: sortlist });
        }
  
    }

    onGenreFilter(chosenGenre) {
        if (chosenGenre) {
            const data = new FormData();
            data.append("genreId", chosenGenre.target.value);
            var xhr = new XMLHttpRequest();

            xhr.open("post", variables.API_URL, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    onCompanyFilter(chosenCompany) {
        if (chosenCompany) {
            const data = new FormData();
            data.append("companyId", chosenCompany.target.value);
            var xhr = new XMLHttpRequest();

            xhr.open("post", variables.API_URL, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    onAddGenre(genre) {
        if (genre) {
            //var genre = genreObject.target.value.trim();
            var isuniq = true;
            for (var i = 0; i < this.state.genres.length; i++) {
                if (this.state.genres[i].genreName === genre) {
                    isuniq = false;
                    break;
                }
            }
            if (isuniq) {
                const data = new FormData();
                data.append("newGenre", genre);
                var xhr = new XMLHttpRequest();

                xhr.open("post", variables.API_URL, true);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        this.loadData();
                    }
                }.bind(this);
                xhr.send(data);

            }
            else {
                alert("Genre: " + genre + " already exist");
            }
        }
    }
    onAddCompany(company) {
        if (company) {
            //var genre = genreObject.target.value.trim();
            var isuniq = true;
            for (var i = 0; i < this.state.companies.length; i++) {
                if (this.state.companies[i].companyName === company) {
                    isuniq = false;
                    break;
                }
            }
            if (isuniq) {
                const data = new FormData();
                data.append("newCompany", company);
                var xhr = new XMLHttpRequest();

                xhr.open("post", variables.API_URL, true);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        this.loadData();
                    }
                }.bind(this);
                xhr.send(data);

            }
            else {
                alert("Company: " + company + " already exist");
            }
        }
    }
   


    // adding movie into db ( request to server )
    onAddMovie(movie) {
        if (movie) {

            const data = new FormData();
            data.append("name", movie.name);
            data.append("genres", movie.genres);
            data.append("company", movie.company)
            data.append("description", movie.description)
            data.append("releaseDate", movie.releaseDate)
            data.append("photoPath", movie.photoName)
            data.append("duration", movie.duration)
            data.append("PhotoId",movie.photoId)

            var xhr = new XMLHttpRequest();

            xhr.open("post", variables.API_URL, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }

    // delete movie from db( request to sever )
    onRemoveMovie(movie) {

        if (movie) {
            var url = variables.API_URL + "/" + movie.id;

            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {

        var remove = this.onRemoveMovie;
        return( <div>
           
            <MovieForm GenresList={this.state.genres}  CompaniesList={this.state.companies} onMovieSubmit={this.onAddMovie} onGenreSubmit={this.onAddGenre} onCompanySubmit={this.onAddCompany} userEmail={this.props.userEmail} />
            <h2>Movies Catalog</h2>
           <div className="row gy-3">
               <div className="col-md-2">
            <label >Filter by Genre:</label>
           
            <div className="select">
                <select id="standard-select" onChange={this.onGenreFilter}>
                    <option value="all" onSelect={this.onGenreFilter}>
                        All
                    </option>
                    {this.state.genres.map((genre) =>
                        <option value={genre.genreId} key={genre.genreId} onSelect={this.onGenreFilter}>
                            {genre.genreName}
                        </option>
                    )}

                </select>
                <span className="focus"></span>
            </div>
            </div>
            <div className="col-md-2">
            <label >Filter by Company:</label>
            <div className="select">
                <select  onChange={this.onCompanyFilter}>
                    <option value="all" onSelect={this.onCompanyFilter}>
                        All
                    </option>
                    {this.state.companies.map((company) => 
                        <option value={company.companyId} key={company.companyId} onSelect={this.onGenreFilter}>
                            {company.companyName}
                        </option>
                    )}

                </select>
                <span className="focus"></span>
            </div>
            </div>
            <div className="col-md-1">
            <label > Sorteren by:</label>
            </div>
            <div className="col-md-1">
            <button onClick={this.sortByDuration}>
                Duration
            </button>
            </div>
            <div className="col-md-1">
            <button onClick={this.sortByRelease}>
                Release
            </button>
            </div>
            </div>
            <div className="album py-5 bg-light">
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
           
                {
                    this.state.movies.map(function (movie) {

                        return <Movie key={movie.id} movie={movie} onRemove={remove} />
                    })
                }
        
            </div>
    </div>
  </div>
        </div>);
    }
}


export default Home;