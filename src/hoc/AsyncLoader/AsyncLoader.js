import React,{Component} from 'react';

const AsyncLoader = (comp) => {
    return class extends Component {
        state = {
            component: null
        }
        componentDidMount() {
            comp()
            .then(cmp=>{
                this.setState({component: cmp.default});
            });
        }
        render() {
            const C = this.state.component;
            return C?<C {...this.props}/>:null;
        }
    }
}

export default AsyncLoader;