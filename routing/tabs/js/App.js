
const App = () => {
  return (
    <Router>
      <div className="tabs">
        <nav className='tabs__items'>
          <NavLink className="tabs__item" exact activeClassName={'tabs__item-active'} to={'/'}>Рефераты</NavLink>
          <NavLink className="tabs__item" activeClassName={'tabs__item-active'} to={'/creator'}>Криэйтор</NavLink>
          <NavLink className="tabs__item" activeClassName={'tabs__item-active'} to={'/fortune'}>Гадалка</NavLink>
        </nav>
        <div className="tabs__content">
          <Switch>
            <Route path="/fortune" component={Fortune}/>
            <Route path="/creator" component={Creator}/>
            <Route path="/" component={Essay}/>
          </Switch>
        </div>
      </div>
    </Router>
  )
};