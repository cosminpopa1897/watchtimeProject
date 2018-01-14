function UserViewModel(id, username, firstName, lastName, email, movies){
    this.Id = id,
    this.Username = username,
    this.FirstName = firstName,
    this.LastName = lastName,
    this.Email = email,
    this.Movies = movies;
}

module.exports.UserViewModel = UserViewModel;