class Cart extends React.Component {

  render() {
    return (
      <CartView {...this.props} />
    );
  }

  shouldComponentUpdate(nextProps) {
    return this.compareProps(this.props, nextProps);
  }

  compareProps(currentProps, nextProps) {
    return nextProps.isOpen !==  currentProps.isOpen || nextProps.items.length !== currentProps.items.length;
  }
}
