import { useSelector, useDispatch } from 'react-redux';
import petListJson from '../pets.json';
import Adoptors from './adopters.js';
import { adoptPet, leavePet } from '../store/adoptSlice';
import loadingImage from '../loading.gif';

function PetList() {

    const dispatch = useDispatch();

    const { address, adopters, adoptInProgress, adoptErrorMessage, adoptError } = useSelector((state) => {
        return state.adoptReducer
    })

    return (
        <div>
            <div>
                GitHub: <a href="https://github.com/Shamsyum">@shamsyum</a>
                <h1 style={{marginTop: '-10px'}}>pet-shop dapp by shams  </h1> 
                Connected wallet Address: {address} <br/><br/>
            </div>
            <Adoptors />
            <div>
                {adoptInProgress ? <img src={loadingImage} alt="Loading" style={{ width: '200px', height: '100px' }} /> : null}
            </div>
            <div>
                {adoptError ? <div style={{ color: 'red' }}>{adoptErrorMessage}</div> : null}
            </div>
            <br />
            {
                petListJson.map((item) => (
                    <div key={item.id} style={{ border: "1px solid black", display: "inline-block", padding: "20px", margin: "10px" }}>

                        <div>
                            <h3>{item.name}</h3>
                        </div>

                        <div>
                            <img alt="140x140" src={item.picture} style={{ width: "200px" }} />
                            <br />
                            <br />
                            <strong>Breed</strong>: <span>{item.breed}</span><br />
                            <strong>Age</strong>: <span>{item.age}</span><br />
                            <strong>Location</strong>: <span>{item.location}</span><br /><br />



                            <div>
                                {
                                    adopters[item.id] === "0x0000000000000000000000000000000000000000" ?
                                        <button type="button" onClick={
                                            async () => {
                                                dispatch(adoptPet(item.id));
                                                // console.log("clicked id: ", item.id);
                                                // const result = await contract.methods.adopt(item.id).send({ from: address })
                                            }
                                        }
                                        >Adopt</button> :

                                        <div>
                                            <button type="button" disabled style={{ marginRight: '10px' }}>Adopted</button>

                                            <button type="button" onClick={
                                                async () => {
                                                    dispatch(leavePet(item.id));
                                                }
                                            }
                                            >LeavePet</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default PetList;