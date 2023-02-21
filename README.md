# testproj

### Understanding based on problem statement:

#### We have three tables in database:

Assuming that there is a shift table which has references in agents, and facilities:

shifts ----> agents
shifts ----> facilities

- create table facilities (
    - id varchar(20) primary key,
    - name varchar(80)
- create table agents
    - id varchar(20) primary key,
    - name varchar(80),
    - email varchar(120)
- create table shifts
    - id varchar(20) primary key,
    - agent_id varchar(20),
    - from_time timestamp,
    - to_time timestamp,
    - foreign key agent_id references(agents.id),
    - foreign key facility_id references(facilities.id)

### Current Code Structure:

We have two functions:
- getShiftsByFacility(id) : This returns all Shifts (array of Shift[]s) by fetching from database
    - Parameters:
        - id `string` : facility id
    - Return value:
        - list representing Shift[]s
- generateReport(shifts) : 
    - Parameters:
        - shifts is a list of Shift[]s.
    - Return value:
        - This returns an instance of `Buffer`/`Uint8Array`, here using `Buffer`.

```
    let shifts = getShiftsByFacility(facilityId);
    let report = generateReport(shifts);
    // Rest of the report handling

    
```

## Task

Agent id in the report is generated from the database, (database's id). 
We need to be able to allow facilities to save their own custom ids, and also generate report for each agent they work with.

### To consider
- Multiple facilities can generate their own version of their id for the agent
- We should not make changes in existing agent id, because:
    - Since new id will be generated by facility, its scope would not be global for the agent. 
    - We need an id to identify agent globally.
    - It should not break any existing functionalities.

### Execution Plan
- Ticket #1 : DB changes:
    - Create a new table `facility_agent_info` to specify relationship between `facility` and `agent`. 
    - Add one column in the table `facility_agent_id`, along with foreign keys to `facility` and `agent`.
- Ticket #2 Changes after fetching facilities + Unit tests:
    - After the `getShiftsByFacility()` call is made, we create and call another function `getAgentsInfoByFacility()`.
`getAgentsInfoByFacility(id)`
- Parameters
    - id `string` facility id
- Return
    - list/array of `Agent`[]s info from `facility_agent_info` table.

- Ticket #3 Changes in report generation + Unit Tests
    - The report generation (`generateReport()`) will now accept an object, such that:
```
function generateReport({shifts, agentInfo}) {
    // report generation
}
```
    - We will utilize the agentInfo we received to send in `generateReport()`

- Ticket #4 : Integration + Integration Tests
    - The final code would look like this:
```
    let shifts = getShiftsByFacility(facilityId);
    let agentInfo = getAgentsInfoByFacility(facilityId);
    let report = generateReport({
        shifts,
        agentInfo
    });
    // Rest of the report handling
    
```



    

