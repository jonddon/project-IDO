pragma solidity ^0.8.0;
import “contract/token/halogen.sol”;  //imports the native token to verify if a project has a token
contract projectListing{
    struct Project{
        bytes32 projectName;
        bytes32 tokenTicker;
        bytes32 tokenAddress;
        bool approved;
        bool canbefunded;
        uint projectid;
        uint amountoraise;
        string projectDescription;
        address owner;//project owner
        //mapping(address=>uint256) funding ;//this will map the address of projects to funds donated;
    }
    Halogen token;
    mapping (uint=>Project) projects;//shows list of projects
        mapping (uint=>address)ownedby; //shows the project owner
      uint nextProjectId; //declare the next project ids
      constructor(address _token){
         token = Halogen(_token);
      }
      project[] allProjects;
//       modifier onlyAdmin() {
//   require(msg.sender == ’admin”) to restrict who can call the addproject function
// }
    function addProject(
        bytes32  _projectName,
        string memory _projectDescription,
        uint  _amountoraise,
        bytes32  _tokenTicker,
        bytes32  _tokenAddress
        ) public {
        require(token.balanceOf(msg.sender)>= 1000, “You do not have enough token”);
        Project storage newProject=projects[nextProjectId]; //
        newProject.projectName=_projectName;
        newProject.projectid=nextProjectId;
        newProject.projectDescription=_projectDescription;
        newProject.amountoraise=_amountoraise;
        newProject.tokenTicker = _tokenTicker;
        newProject.tokenAddress = _tokenAddress;
        ownedby[nextProjectId] = msg.sender; //indicate owner for the particular project id
        nextProjectId++; //add more project ids
}
function getAllProjects() public view returns(Project[] memory){
    return allProjects;
    }
    function getAProject(uint _id) public view returns(Project memory){
     return projects[_id];
    }
}




