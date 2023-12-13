import { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Dropdown, Flex, Table } from 'antd'
function App() {
  // {
  //   "id": string,
  //     "league_id": number,
  //       "date": string,
  //         "title": string,
  //           "hour": string,
  //             "ordinal_number": string,
  //               "venue": string,
  //                 "home": string,
  //                   "away": string,
  //                     "score": string,
  //                       "channel": string,
  //                         "audience": string
  // }
  const [dataSource, setData] = useState([])
  const [directory, setDirectory] = useState('biaSaoVang')
  useEffect(() => {
    const res = fetch(`http://localhost:9000/crawl/${ directory }`).then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [directory])

  const columns = [{
    title: 'Số thứ tự',
    dataIndex: 'ordinal_number',
    key: 'ordinal_number',
  },
  {
    title: 'Ngày tháng',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Giờ',
    dataIndex: 'hour',
    key: 'hour',
  },
  {
    title: 'Sân vận động',
    dataIndex: 'venue',
    key: 'venue',
  },
  {
    title: 'Đội nhà',
    dataIndex: 'home',
    key: 'home',
  },
  {
    title: 'Điểm',
    dataIndex: 'score',
    key: 'score',
  }, {
    title: 'Đội khách',
    dataIndex: 'away',
    key: 'away',
  },
  {
    title: 'Kênh phát sóng',
    dataIndex: 'channel',
    key: 'channel',
  },
  {
    title: 'Lượng người theo dõi',
    dataIndex: 'audience',
    key: 'audience',
  },

  ];
  return (
    <div style={ {
      paddingTop: '100px',
      backgroundColor: '#212121'
    } }>
      <div style={ { display: 'flex', alignItems: 'center', marginBottom: '30px', width: '100%', justifyContent: 'center' } }>
        <Button type="primary" style={ { width: 'fit-content', marginRight: '10px' } } onClick={ () => setDirectory('biaSaoVang') }>Bia Sao Vàng</Button>
        <Button type="primary" danger style={ { width: 'fit-content', marginRight: '10px' } } onClick={ () => setDirectory('Casper') }>
          Casper
        </Button> <Button type="default" danger style={ { width: 'fit-content' } } onClick={ () => setDirectory('Nightwolf') }>

          Nightwolf
        </Button>
      </div>
      { dataSource.length ? dataSource.sort((a, b) => a.index - b.index).map(data => <div key={ data.id } style={ { marginBottom: '10px', backgroundColor: '#555555' } }>
        <div style={ { width: '80%', margin: 'auto', textAlign: 'center', padding: '10px', color: 'white' } }>{ data.title }</div>
        <div style={ { width: '80%', margin: 'auto' } }>
          <Table dataSource={ [data] } columns={ columns } />;
        </div>
      </div>) : <p>Không có data</p> }
    </div>
  )
}

export default App;
